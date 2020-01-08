import cocos
import pyglet
import random
import socket
import math
import copy

random.seed()


class UILayer(cocos.layer.Layer):
    """
    """
    
    lives_remaining_legend = 'Lives: '
    
    def __init__(self):
        """ """
        super( UILayer, self ).__init__()
        
        width, height = cocos.director.director.get_window_size()
        
        labelPos = (width * 0.1, height * 0.95)
        self.lives_remaining_label = cocos.text.Label(
              UILayer.lives_remaining_legend + str(0),
              font_name = 'Arial',
              font_size = 20,
              anchor_x = 'center',
              anchor_y = 'center',
              color = (255, 255, 255, 255))
        self.lives_remaining_label.position = labelPos
        self.add(self.lives_remaining_label, z=10)

    def updateLivesRemaining(self, number):
        """ """
        self.lives_remaining_label.element.text = \
            UILayer.lives_remaining_legend + str(number)


class KeyboardInputLayer(cocos.layer.Layer):
    """ 
    """
    
    # You need to tell cocos that your layer is for handling input!
    # This is key (no pun intended)!
    # If you don't include this you'll be scratching your head wondering why your game isn't accepting input
    is_event_handler = True

    def __init__(self):
        """ """
        super(KeyboardInputLayer, self).__init__()
        self.keys_being_pressed = set()

    def on_key_press(self, key, modifiers):
        """ """
        self.keys_being_pressed.add(key)

    def on_key_release(self, key, modifiers):
        """ """
        if key in self.keys_being_pressed:
            self.keys_being_pressed.remove(key)


class PlayLayer(KeyboardInputLayer):
    """
    """
    background_image_name = 'nebula_1024x768.png'
    background_image = pyglet.resource.image(background_image_name)
    ownID = socket.gethostbyname(socket.gethostname())
    
    def __init__( self ):
        """ """
        super( PlayLayer, self ).__init__()
        
        self.players = {}
        self.batch = cocos.batch.BatchNode()
        self.add(self.batch)

        width, height = cocos.director.director.get_window_size()
        backgroundSprite = cocos.sprite.Sprite(PlayLayer.background_image_name,
            position=(width * 0.5, height * 0.5))
        backgroundSprite.scale_x = width / backgroundSprite.width
        backgroundSprite.scale_y = height / backgroundSprite.height
        self.add(backgroundSprite, z=-1)

    def updateLivesRemaining(self, number):
        """ """
        ui_layer = self.get_ancestor(UILayer)
        if ui_layer:
            ui_layer.updateLivesRemaining(number)
    
    def addExplosion(self, position):
        """ """
        new_explosion = Explosion()
        new_explosion.position = position
        self.batch.add(new_explosion)
        new_explosion.start()

    def addAsteroids(self, count=8):
        """ """
        for i in range(0, count):
            new_asteroid = Asteroid()
            self.batch.add(new_asteroid)
            new_asteroid.start()

    def addPlayer(self, player_id):
        """ """
        new_player = None
        if player_id in self.players:
            new_player = self.players[player_id]
            new_player.setRandomPosition()
            new_player.onRespawn()
            #print('respawning ', player_id)
        else:
            new_player = Player(player_id)
            self.players[player_id] = new_player
            new_player.start()
        
        self.batch.add(new_player)
        new_player.motion_vector = (0, 0)
        new_player.shouldDie = False
        if PlayLayer.ownID != player_id:
            new_player.color = (255, 255, 0)
        else:
            self.updateLivesRemaining(new_player.lives_remaining)

    def fireBulletForPlayer(self, player_id):
        """ """
        if player_id in self.players:
            # Don't shoot if not in teh game at the moment
            player = self.players[player_id]
            if not player.shouldDie:
                dx, dy = player.getHeadingVector()
                x, y = player.position
                x += dx * player.radius * 1.5 # Move bullet out of ship
                y += dy * player.radius * 1.5 # Move bullet out of ship
                
                new_bullet = Bullet(position=(x, y),
                    motion_vector=(dx, dy))
                self.batch.add(new_bullet)
                new_bullet.start()
        else:
            print('Error: fire for unknown player,', player_id)

    def rotatePlayer(self, player_id, deg):
        """ """
        if player_id in self.players:
            player = self.players[player_id]
            player.do(cocos.actions.RotateBy(deg, 0.05))

    def thrustPlayer(self, player_id):
        """ """
        if player_id in self.players:
            player = self.players[player_id]
            player.thrust()

    def shieldPlayer(self, player_id):
      """ """
		#print('shieldPlayer()')
      if player_id in self.players:
         player = self.players[player_id]
         player.raiseShields()

    def unshieldPlayer(self, player_id):
      """ """
      if player_id in self.players:
         player = self.players[player_id]
         player.dropShields()


class GameSpriteAction(cocos.actions.Action):
    """ 
    This class exists to forward the step(dt) method call to the 
    receiver's target object. It is a hook that enables targets to
    perform logic each time the display is updated.
    """
    
    def step(self, dt):
        """ """
        self.target.step(dt)


class GameSprite(cocos.sprite.Sprite):
    """
    This class exists to provide several features shared by almost
    every game object.
    
    Each instance has the following:
    A unique identifier
    A motion vector to describe how the instances should move.
    A radius used to detect collisions with other GameSprite 
        instances
    A flag, shouldDie, used to signal when the instance should be
    removed from the game.
    
    Instances automatically move according to each instance's
    motion vector. Positions "wrap" meaning that if an instance moves 
    off the screen, it reappears on the opposite side of the screen.
    """
    next_unique_id = 1
    live_instances = {} # map unique_id to instance with that id

    @staticmethod
    def handleCollisions():
        """ """
        objects = GameSprite.live_instances.values()
        opjectsCopy = list(objects)
        for object in opjectsCopy:
            for other_object in opjectsCopy:
                if other_object.id != object.id and \
                        object.isHitByCircle(other_object.position,\
                        other_object.radius):
                    object.onCollision(other_object)
    @staticmethod
    def getInstances(klass):
        """ """
        result = []
        for object in GameSprite.live_instances.values():
            if isinstance(object, klass):
                result.append(object)
        return result

    def __init__(self, image, id=None, position=(0, 0), rotation=0,
            scale=1, opacity = 255, color=(255, 255, 255),
            anchor=None):
        """ """
        super( GameSprite, self ).__init__( image, position, rotation,
            scale, opacity, color, anchor)
        if not id:
            self.id = GameSprite.next_unique_id
        else:
            self.id = id
        
        GameSprite.next_unique_id += 1
        self.motion_vector = (0,0)  # No motion by default
        self.radius = 3             # Small default radius
        self.shouldDie = False
        self.type = '_'
        GameSprite.live_instances[self.id] = self

    def start(self):
        """ """
        self.do(GameSpriteAction())
        
    def getInfo(self):
        """ """
        x, y = self.position
        rot_deg = self.rotation
        return {'id':self.id,
            'type':self.type,
            'pos':(int(x), int(y)),
            'rot_deg': int(rot_deg),
            'shouldDie' : self.shouldDie }
    
    def updateWithInfo(self, info):
        """ """
        self.position = info['pos']
        self.rotation = info['rot_deg']
        self.shouldDie = info['shouldDie']
    
    def getVelocityMultiplier(self):
        """ Return a multiplier for use when calculating motion per
            unit time.
        """
        return 1
    
    def setRandomPosition(self):
        width, height = cocos.director.director.get_window_size()
        self.position = (random.random() * width,
            random.random() * height)
    
    def markForDeath(self):
        """ """
        self.shouldDie = True
    
    def isHitByCircle(self, center, radius):
        """ Returns True if and only if the receiver's circle 
            calculated using the receiver's position and radius 
            overlaps the circle calculated using the center and radius 
            arguments to this method. 
        """
        total_radius = self.radius + radius
        total_radius_squared = total_radius * total_radius
        x, y = self.position
        delta_x = center[0] - x
        delta_y = center[1] - y
        distance_squared = delta_x * delta_x + delta_y * delta_y
        
        return distance_squared < total_radius_squared

    def processCollision(self, other_object):
        """ """
        playLayer = self.get_ancestor(PlayLayer)
        if playLayer:
            playLayer.addExplosion(self.position)
        return True
    
    def onRespawn(self):
        """ Adds the receiver back into collision detection set after
            receiver has respawned """
        GameSprite.live_instances[self.id] = self
        self.do(GameSpriteAction())
    
    def onCollision(self, other_object):
        """ """
        if self.processCollision(other_object):
            self.markForDeath()

    def step(self, dt):
        """ Perform any updates that should occur after dt seconds 
            from the last update.
        """
        if self.shouldDie:
            self.stop()
            self.kill()
                
            if self.id in GameSprite.live_instances:
                del GameSprite.live_instances[self.id]
        else:
            width, height = cocos.director.director.get_window_size()
            dx = self.motion_vector[0] * self.getVelocityMultiplier()
            dy = self.motion_vector[1] * self.getVelocityMultiplier()
            x = self.position[0] + dx * dt
            y = self.position[1] + dy * dt
            
            if x < 0: x += width
            elif x > width: x -= width
            
            if y < 0: y += height
            elif y > height: y -= height
            
            self.position = (x, y)


class Asteroid(GameSprite):
    """
    """
    
    # Don't call calls variable 'image' because it masks pyglet
    # Sprite class variable and accessors
    sprite_image = pyglet.resource.image('asteroidSpriteSheet.png')
    grid = pyglet.image.ImageGrid(sprite_image, 6, 5)
    textures = pyglet.image.TextureGrid(grid)
    textures_list = textures[:]
    frame_period = 0.05
    animation = pyglet.image.Animation.from_image_sequence(
        textures_list, frame_period, loop=True)
    velocity_multiplier = 200
    
    def __init__(self, id=None, position=(0, 0), rotation=0, scale=1,
                 opacity = 255, color=(255, 255, 255), anchor = None):
        """ """
        image = Asteroid.animation
        super( Asteroid, self ).__init__(image, id, position, rotation,
            2, opacity, color, anchor)

        #self.scale = 2
        self.motion_vector = (self.getRandomMotionMagnitude(),
            self.getRandomMotionMagnitude())
        self.setRandomPosition()
        self.type = 'a'
        
        # Radius is a bit less than half width
        self.radius = self.image.get_max_width() * self.scale * 0.4

    def getVelocityMultiplier(self):
        """ """
        return Asteroid.velocity_multiplier
    
    def getRandomMotionMagnitude(self):
        """ """
        return random.random() - 0.5

    def processCollision(self, other_object):
        """ Overrides inherited version to prevent asteroid collisions
            with other asteroids. """
        result = not isinstance(other_object, Asteroid)
        if result:
            # Let inherited behavior rule the day
            super( Asteroid, self ).processCollision(other_object)

        return result


class Player(GameSprite):
    """
    """

    # Don't call calls variable 'image' because it masks pyglet
    # Sprite class variable and accessors
    shield_image = pyglet.resource.image('shield2.png')
    ship_image = pyglet.resource.image('ship.png')
    ship_foreward_image = pyglet.resource.image('shipForward.png')
    thrust_multiplier = 200
    max_velocity_squared = 500 * 500
    initial_lives = 3

    def __init__( self, player_id=None, id=None, position=(0, 0),
            rotation=0, scale=1, opacity = 255, color=(255, 255, 255),
            anchor=None):
      """ """
      num_lives=Player.initial_lives
      image = Player.ship_image
      super( Player, self ).__init__(image, id, position, rotation,
         scale, opacity, color, anchor)

      self.player_id = player_id
      self.is_thrusting = False
      self.setRandomPosition()
      self.rotation = random.random() * 360.0 # deg.
      self.type = 'p'
      self.radius = \
         self.image.width * self.scale * 0.4 # bit less than half 
      self.lives_remaining = num_lives
      self.is_shielded = False
      self.shield = None
		
    def getInfo(self):
        result = super( Player, self ).getInfo()
        result['player_id'] = self.player_id
        result['is_thrusting'] = self.is_thrusting
        result['lives'] = self.lives_remaining
        result['is_shielded'] = self.is_shielded
        return result

    def updateWithInfo(self, info):
        """ """
        super( Player, self ).updateWithInfo(info)
        if 'player_id' in info: self.player_id = info['player_id']
        else: print('Error: ', info)
        if 'is_thrusting' in info: self.is_thrusting = info['is_thrusting']
        else: print('Error: ', info)
        if 'lives' in info: self.lives_remaining = info['lives']
        else: print('Error: ', info)
        if 'is_shielded' in info: self.is_shielded = info['is_shielded']
   
    def thrust(self):
        """ """
        dx, dy = self.getHeadingVector()
        vx, vy = self.motion_vector
        vx += dx
        vy += dy
        
        # Limit magnitude of velocity
        if Player.max_velocity_squared < (vx * vx + vy * vy):
             vx *= 0.8
             vy *= 0.8
        
        self.motion_vector = (vx, vy)
        self.is_thrusting = True

    def raiseShields(self):
      """ """
      self.is_shielded = True

    def dropShields(self):
      """ """
      self.is_shielded = False

    def step(self, dt):
        """ """
        super( Player, self ).step(dt)

        if self.is_thrusting:
            self.image = Player.ship_foreward_image
            self.is_thrusting = False
        else:
            self.image = Player.ship_image
            
        # Add shield support
        if self.is_shielded:
            if self.parent and None == self.shield:
                self.shield = cocos.sprite.Sprite(Player.shield_image)
                self.parent.add(self.shield)
            if self.shield:
                self.shield.position = self.position
        elif self.shield and self.parent:
            self.parent.remove(self.shield)
            self.shield = None

        if self.shouldDie:
            if self.shield:
                self.shield.kill()
                self.shield = None
                
            if self.id in GameSprite.live_instances:
                del GameSprite.live_instances[self.id]
			
    def getHeadingVector(self):
        """ """
        rad = math.radians(-self.rotation)
        return (math.cos(rad), math.sin(rad))

    def processCollision(self, other_object):
      """ """
      if self.is_shielded:
         return False	
         
      self.lives_remaining -= 1

      if 0 <= self.lives_remaining:
         playLayer = self.get_ancestor(PlayLayer)
         if playLayer:
            playLayer.do(cocos.actions.Delay(5) + \
               cocos.actions.CallFuncS(\
               PlayLayer.addPlayer, self.player_id))

      return super( Player, self ).processCollision(other_object)



class Bullet(GameSprite):
    """
    """
    # Don't call calls variable 'image' because it masks pyglet
    # Sprite class variable and accessors
    bullet_image = pyglet.resource.image('bullet.png')
    lifetime = 1.0 #second
    speed = 600
    
    def __init__( self, id=None, position=(0,0), motion_vector=(0,0),
            rotation=0, scale=1, opacity = 255,
            color=(255, 255, 255), anchor=None ):
        """ """
        super( Bullet, self ).__init__(Bullet.bullet_image, id,
            position, rotation, scale, opacity, color, anchor)
        self.motion_vector = motion_vector
        self.type = 'b'
        
        # remove bullet from its parent at end of its lifetime
        self.do(cocos.actions.Delay(Bullet.lifetime) +\
            cocos.actions.CallFuncS(Bullet.markForDeath))

    def getVelocityMultiplier(self):
        """ """
        return Bullet.speed
    
    def processCollision(self, other_object):
        """ Overrides inherited version to prevent bullet collisions
            with other bullets and prevent bullets from exploding. """
        return not isinstance(other_object, Bullet)


class Explosion(GameSprite):
    """
    """
    
    # Don't call calls variable 'image' because it masks pyglet
    # Sprite class variable and accessors
    small_image = pyglet.resource.image('explosionSmall.png')
    small_grid = pyglet.image.ImageGrid(small_image, 5, 5)
    small_textures = pyglet.image.TextureGrid(small_grid)
    small_textures_list = small_textures[:]
    frame_period = 0.05
    small_animation = pyglet.image.Animation.from_image_sequence(
        small_textures_list, frame_period, loop=True)
    duration = len(small_textures_list) * frame_period
    default_opacity = 128
    
    def __init__(self, id=None, position=(0, 0), rotation=0, scale=1,
                 opacity = 255, color=(255, 255, 255), anchor = None):
        """ """
        image = Explosion.small_animation
        opacity = Explosion.default_opacity
        scale = 2
        super( Explosion, self ).__init__(image, id, position,
            rotation, scale, opacity, color, anchor)
        self.type = 'e'
        self.do(cocos.actions.Delay(Explosion.duration) + \
            cocos.actions.CallFuncS(Explosion.markForDeath))

    def processCollision(self, other_object):
        """ Overrides inherited version to prevent collisions
            with anything. """
        return False


if __name__ == "__main__":
    assert False
