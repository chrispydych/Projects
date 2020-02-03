import numpy as np
import pandas as pd

from datapackage import Package

package = Package('https://datahub.io/core/s-and-p-500/datapackage.json')

for resource in package.resources:
    if resource.descriptor['datahub']['type'] == 'derived/csv':
        print(resource.read())