from flask import Flask, request, jsonify
import json, sqlite3
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/schedule/week/<int:week_id>', methods=['GET'])
def week_sched(week_id):
    fi = open('nflschedulef.json', 'r')

    context = {}
    connection = sqlite3.connect('nflschedule.db')
    cursor = connection.cursor()

    """
    Schema
    	0: gameid INTEGER PRIMARY KEY,
    	1: away_team TEXT,
    	2: home_team TEXT,
    	3: game_date TEXT,
    	4: game_week INTEGER,
    	5: game_time_et TEXT,
    	6: tv_station TEXT
    """
    for row in cursor.execute('SELECT * FROM game WHERE game_week=?', [week_id]):
        context[row[0]] = {
                        'gameDate': row[3],
                        'awayTeam': row[1],
                        'homeTeam': row[2],
                        'gameWeek': row[4],
                        'gameTimeET': row[5],
                        'tvStation': row[6]
                    }

    connection.close()

    return jsonify(context)


@app.route('/schedule/team/<string:team_id>', methods=['GET'])
def team_sched(team_id):
    fi = open('nflschedulef.json', 'r')

    context = {}

    connection = sqlite3.connect('nflschedule.db')
    cursor = connection.cursor()

    """
    Schema
    	0: gameid INTEGER PRIMARY KEY,
    	1: away_team TEXT,
    	2: home_team TEXT,
    	3: game_date TEXT,
    	4: game_week INTEGER,
    	5: game_time_et TEXT,
    	6: tv_station TEXT
    """
    for row in cursor.execute('SELECT * FROM game WHERE home_team=:team OR away_team=:team', {'team': team_id}):
        context[row[0]] = {
                        'gameDate': row[3],
                        'awayTeam': row[1],
                        'homeTeam': row[2],
                        'gameWeek': row[4],
                        'gameTimeET': row[5],
                        'tvStation': row[6]
                    }

    connection.close()
    return jsonify(context)


def nonblank_lines(fi):
    for l in fi:
        line = l.rstrip()
        if line:
            yield line


if __name__ == '__main__':
    app.debug = True
    app.run()
