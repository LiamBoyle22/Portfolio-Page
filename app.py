from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
   
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/minigames")
def minigames():
    return render_template("minigames.html")

if __name__ == "__main__":
    app.run(debug=True)