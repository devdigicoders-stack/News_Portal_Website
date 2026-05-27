import { useState, useEffect } from 'react';
import { FaBolt, FaCircle, FaFire } from 'react-icons/fa';

export default function CricketScore() {
  const [matchState, setMatchState] = useState({
    batsman1: 'Virat Kohli',
    batsman1Runs: 78,
    batsman1Balls: 52,
    batsman2: 'Rishabh Pant',
    batsman2Runs: 42,
    batsman2Balls: 29,
    bowler: 'Mitchell Starc',
    bowlerWickets: 2,
    bowlerRuns: 48,
    bowlerOvers: '3.4',
    indScore: 218,
    indWickets: 4,
    overs: 18,
    balls: 4,
    lastEvent: 'Single taken.',
    recentBalls: ['4', '6', '1', 'W', '2', '1'],
    status: 'IND vs AUS, T20 World Cup Final — IND needs 34 runs in 8 balls'
  });

  const [flashWicket, setFlashWicket] = useState(false);
  const [flashBoundary, setFlashBoundary] = useState(false);
  const [boundaryText, setBoundaryText] = useState('FOUR!');

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchState((prev) => {
        let newOvers = prev.overs;
        let newBalls = prev.balls + 1;
        if (newBalls >= 6) {
          newOvers += 1;
          newBalls = 0;
        }

        const events = ['1', '2', '4', '6', '0', 'W', '1'];
        const randomEvent = events[Math.floor(Math.random() * events.length)];

        let newIndScore = prev.indScore;
        let newIndWickets = prev.indWickets;
        let newB1Runs = prev.batsman1Runs;
        let newB1Balls = prev.batsman1Balls + 1;
        let newB2Runs = prev.batsman2Runs;
        let newB2Balls = prev.batsman2Balls;
        let newLastEvent = '';
        let newRecent = [...prev.recentBalls.slice(1), randomEvent];

        if (randomEvent === 'W') {
          newIndWickets += 1;
          if (newIndWickets >= 10) {
            newIndWickets = 0;
            newIndScore = 0;
          }
          newB1Runs = 0;
          newB1Balls = 0;
          newLastEvent = 'OUT! Virat Kohli caught at Deep Midwicket!';
          
          setFlashWicket(true);
          setTimeout(() => setFlashWicket(false), 3000);
        } else {
          const runs = parseInt(randomEvent) || 0;
          newIndScore += runs;
          newB1Runs += runs;

          if (runs === 4) {
            newLastEvent = 'FOUR! Crack shot past point!';
            setBoundaryText('FOUR!');
            setFlashBoundary(true);
            setTimeout(() => setFlashBoundary(false), 2000);
          } else if (runs === 6) {
            newLastEvent = 'SIX! Majestic strike over long-on!';
            setBoundaryText('SIX!!');
            setFlashBoundary(true);
            setTimeout(() => setFlashBoundary(false), 2000);
          } else if (runs === 0) {
            newLastEvent = 'Dot ball, solid defense.';
          } else {
            newLastEvent = `${runs} run(s) taken. Nice running.`;
          }
        }

        // Swap batsmen randomly on odd runs
        if (randomEvent === '1' || randomEvent === '3') {
          return {
            ...prev,
            overs: newOvers,
            balls: newBalls,
            indScore: newIndScore,
            indWickets: newIndWickets,
            batsman1: prev.batsman2,
            batsman1Runs: newB2Runs,
            batsman1Balls: newB2Balls,
            batsman2: prev.batsman1,
            batsman2Runs: newB1Runs,
            batsman2Balls: newB1Balls,
            lastEvent: newLastEvent,
            recentBalls: newRecent
          };
        }

        return {
          ...prev,
          overs: newOvers,
          balls: newBalls,
          indScore: newIndScore,
          indWickets: newIndWickets,
          batsman1Runs: newB1Runs,
          batsman1Balls: newB1Balls,
          lastEvent: newLastEvent,
          recentBalls: newRecent
        };
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-zinc-950 text-white border-y border-red-700/50 py-1.5 px-4 font-sans text-xs flex flex-wrap items-center justify-between gap-4 overflow-hidden relative shadow-inner">
      {flashWicket && (
        <div className="absolute inset-0 bg-red-700 flex items-center justify-center font-black tracking-widest text-white text-sm uppercase z-20 gap-2 animate-flash-wicket">
          <FaFire className="text-white animate-bounce" /> WICKET FALLEN !!! <FaFire className="text-white animate-bounce" />
        </div>
      )}
      {flashBoundary && (
        <div className="absolute inset-0 bg-emerald-600 flex items-center justify-center font-black tracking-widest text-white text-sm uppercase z-20 gap-2 animate-flash-boundary">
          <FaBolt className="text-amber-300 animate-spin" /> {boundaryText} <FaBolt className="text-amber-300 animate-spin" />
        </div>
      )}

      {/* Live Label */}
      <div className="flex items-center gap-1.5 shrink-0 bg-red-600 text-white font-black px-2.5 py-0.5 uppercase tracking-wider rounded-md text-[10px] animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.7)]">
        <FaCircle className="text-[6px] text-white" /> Live T20
      </div>

      {/* Match Score */}
      <div className="flex items-center gap-3 shrink-0 border-r border-zinc-800 pr-4">
        <span className="font-black text-gray-300">IND:</span>
        <span className="font-extrabold text-red-500 text-sm tracking-tight">
          {matchState.indScore}/{matchState.indWickets}
        </span>
        <span className="text-gray-400 font-semibold">({matchState.overs}.{matchState.balls} Ov)</span>
      </div>

      {/* Active Batsmen */}
      <div className="flex items-center gap-4 text-zinc-300 overflow-x-auto hide-scrollbar shrink-0">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="font-bold text-white">{matchState.batsman1}*</span>
          <span className="text-amber-400 font-semibold">{matchState.batsman1Runs} ({matchState.batsman1Balls})</span>
        </div>
        <div className="flex items-center gap-1 border-l border-zinc-800 pl-4 whitespace-nowrap">
          <span className="font-medium">{matchState.batsman2}</span>
          <span className="text-gray-400 font-semibold">{matchState.batsman2Runs} ({matchState.batsman2Balls})</span>
        </div>
      </div>

      {/* Last Ball Event Description */}
      <div className="hidden lg:flex items-center gap-2 text-zinc-400 max-w-sm truncate flex-1 justify-center">
        <span className="bg-zinc-800 text-[10px] text-zinc-300 font-bold px-1.5 py-0.5 rounded-sm uppercase flex items-center gap-0.5 shrink-0">
          <FaBolt className="text-amber-400" /> Event
        </span>
        <span className="italic font-medium">{matchState.lastEvent}</span>
      </div>

      {/* Recent Ball Tracker */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-zinc-500 font-bold uppercase text-[9px] mr-1">This Over:</span>
        <div className="flex items-center gap-1">
          {matchState.recentBalls.map((b, i) => {
            let bg = 'bg-zinc-800 text-zinc-300';
            if (b === '4') bg = 'bg-emerald-600/90 text-white font-bold';
            if (b === '6') bg = 'bg-blue-600/90 text-white font-bold';
            if (b === 'W') bg = 'bg-red-600 text-white font-black animate-pulse';
            return (
              <span 
                key={i} 
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow ${bg}`}
              >
                {b}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
