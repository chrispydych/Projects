import cocos
import pyglet
import sys
import CommonLayers

class Game(object):
    """
    """
    default_title = "BasicGame"
    default_window_width = 1366
    default_window_height = 700

    def __init__(self):
        super( Game, self).__init__()

        director_width = Game.default_window_width
        director_height = Game.default_window_height

        caption = Game.default_title + ' ' + \
            CommonLayers.PlayLayer.ownID
        window = cocos.director.director.init(
                director_width, director_height,
                caption = caption, fullscreen=False)
        print(window.get_viewport_size())

        intro_layer = CommonLayers.PlayLayer()
        intro_layer.anchor_x = director_width * 0.5
        intro_layer.anchor_y = director_height * 0.5
        intro_layer.addAsteroids(3)

        intro_menu = IntroMenu(self)
        intro_layer.add(intro_menu)
        
        self.intro_scene = cocos.scene.Scene(intro_layer)

    def run(self, host=None, port=None):
        """ """
        self.host = host
        self.port = port
        cocos.director.director.set_show_FPS(True)
        cocos.director.director.run (self.intro_scene)

    def on_join_game( self ):
        """ """
        gameInstance = GameServer.GameServer()
        cocos.director.director.replace(FadeTRTransition(
            gameInstance.get_scene(), 2))
        gameInstance.start()

    def on_host_game( self ):
        """ """
        gameInstance = GameServer.GameServer()
        cocos.director.director.replace(FadeTRTransition(
            gameInstance.get_scene(), 2))
        gameInstance.start()

    def on_name( self, value ):
        """ """
        self.player_name = value

    def on_quit( self ):
        """ """
        pyglet.app.exit()


class IntroMenu(cocos.menu.Menu):
    """
    """
    def __init__( self, game ):
        """ """
        super( IntroMenu, self ).__init__()
        self.game = game
        self.font_item = {
            'font_name': 'Arial',
            'font_size': 32,
            'bold': True,
            'color': (220, 200, 220, 100),
        }
        self.font_item_selected = {
            'font_name': 'Arial',
            'font_size': 42,
            'bold': True,
            'color': (255, 255, 255, 255),
        }

        l = []
        l.append( cocos.menu.MenuItem('Join Game',
            self.game.on_join_game ) )
        l.append( cocos.menu.MenuItem('Host Game',
            self.game.on_host_game ) )
        l.append( cocos.menu.EntryMenuItem('Name:',
            self.game.on_name,
            CommonLayers.PlayLayer.ownID) )
        l.append( cocos.menu.MenuItem('Quit', self.game.on_quit ) )

        self.create_menu( l )


if __name__ == "__main__":
    game = Game()
    if len(sys.argv) == 2:
        host, port = sys.argv[1].split(":")
        print(host, port)
        game.run(host, int(port))
    else:
        game.run()