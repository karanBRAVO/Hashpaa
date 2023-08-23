from flask import Flask, render_template, redirect, url_for, request
from hasher import Hasher

APP = Flask(import_name=__name__,
            static_folder="./web/static",
            template_folder="./web/templates")

HASHER = Hasher()

HOST = "localhost"
PORT = 8181
DEBUG = True


@APP.route("/")
def home():
    return render_template("index.html",
                           available_algos=HASHER.available_hashers())


@APP.route("/get-hash", methods=["POST", "GET"])
def hashing():
    if request.method == "POST":
        algo = request.form["algo"]
        word = request.form["word"]
        length = request.form["length"]
        encoding = request.form["encoding"]
        hashed_word = HASHER.gen_hash(word, algo, encoding, length)
        return hashed_word
    else:
        return "<h1>404 Page Not Found</h1><br><h3>Invalid URL entered<h3>"


if __name__ == "__main__":
    APP.run(host=HOST, port=PORT, debug=DEBUG)
