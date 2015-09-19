from flask import Flask, request, jsonify
import json
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/schedule/week/<int:week_id>', methods=['GET'])
def week_sched(week_id):
    fi = open('nflschedulef.json', 'r')

    context = {}

    for line in nonblank_lines(fi):
        jdata = json.loads(line)
        if int(jdata['gameWeek']) <= week_id:
            if int(jdata['gameWeek']) == week_id:
                context[int(jdata['gameId'])] = {
                    'gameDate': jdata['gameDate'],
                    'awayTeam': jdata['awayTeam'],
                    'homeTeam': jdata['homeTeam'],
                    'gameTimeET': jdata['gameTimeET'],
                    'tvStation': jdata['tvStation']
                }

    return jsonify(context)


@app.route('/schedule/team/<string:team_id>', methods=['GET'])
def team_sched(team_id):
    fi = open('nflschedulef.json', 'r')

    context = {}

    for line in nonblank_lines(fi):
        jdata = json.loads(line)
        if jdata['awayTeam'] == team_id or jdata['homeTeam'] == team_id:
            context[int(jdata['gameId'])] = {
                'gameDate': jdata['gameDate'],
                'awayTeam': jdata['awayTeam'],
                'homeTeam': jdata['homeTeam'],
                'gameTimeET': jdata['gameTimeET'],
                'tvStation': jdata['tvStation']
            }

    return jsonify(context)


def nonblank_lines(fi):
    for l in fi:
        line = l.rstrip()
        if line:
            yield line


if __name__ == '__main__':
    app.debug = True
    app.run()
