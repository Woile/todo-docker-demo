import os

MONGO_HOST = os.getenv('MONGO_HOST', '127.0.0.1')
MONGO_PORT = int(os.getenv('MONGO_PORT', 27017))
