from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/schedule/week/<int:week_id>', methods=['GET'])
def week_sched(week_id):
    fi = open('nflschedulef.json', 'r')

    context = {}

    for line in nonblank_lines(fi):
        jdata = json.loads(line)
        if int(jdata['gameWeek']) <= week_id:
            if int(jdata['gameWeek']) == week_id:
                context[jdata['gameId']] = {
                    'gameDate': jdata['gameDate'],
                    'awayTeam': jdata['awayTeam'],
                    'homeTeam': jdata['homeTeam'],
                    'gameTimeET': jdata['gameTimeET']
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
