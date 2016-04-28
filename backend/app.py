import falcon
from falcon_cors import CORS

import mongoengine as mongo

import todo

import settings
import middlewares


cors = CORS(allow_all_origins=True,
            allow_all_methods=True,
            allow_all_headers=True)

api = application = falcon.API(middleware=[
    cors.middleware,
    middlewares.JSONTranslator(),
    middlewares.LogMiddleware()
])

todo_resource = todo.ToDoResource()

mongo.connect('db', host=settings.MONGO_HOST, port=settings.MONGO_PORT)

api.add_route('/api/v1/todos/{id}', todo_resource)
api.add_route('/api/v1/todos', todo_resource)
