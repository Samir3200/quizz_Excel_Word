"use client";


import { useState, useEffect } from 'react';
import { quizData as quizExcelData } from '@/app/data/quizExcelData';
import { wordQuizData as quizWordData } from '@/app/data/quizWordData';

export default function Home() {
  // État pour savoir quel module est actif : 'excel' ou 'word'
  const [activeTab, setActiveTab] = useState('excel');
  
  // États de progression du quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
    const [showBigConfetti, setShowBigConfetti] = useState(false);
    const [shuffledQuizData, setShuffledQuizData] = useState<(typeof quizExcelData)>([]);

    // Animation XXL score parfait : déclenchée par useEffect
    useEffect(() => {
      if (showResults && score === shuffledQuizData.length && shuffledQuizData.length > 0) {
        setShowBigConfetti(true);
        const timeout = setTimeout(() => setShowBigConfetti(false), 2200);
        return () => clearTimeout(timeout);
      }
    }, [showResults, score, shuffledQuizData.length]);
  // Mélange aléatoire des questions à chaque début de quiz ou changement d'onglet
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Met à jour le quiz mélangé à chaque changement d'onglet
  useEffect(() => {
    const data = activeTab === 'excel' ? quizExcelData : quizWordData;
    setShuffledQuizData(shuffleArray(data));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  }, [activeTab]);

  const quizData = shuffledQuizData;

  // Changement d'onglet (réinitialise le quiz en cours)
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  };

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        // Passe automatiquement à la question suivante après l'animation
        handleNextQuestion();
      }, 8000);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  };

  // Configurations graphiques dynamiques selon le thème
  const theme = {
    excel: {
      primary: '#107c41',
      primaryDark: '#0b5930',
      primaryLight: '#e2f0d9',
      textSuccess: '#385723',
      bgError: '#fce4d6',
      textError: '#c00000',
      fileName: 'Quiz_Excel_Bases.xlsx',
      software: 'Microsoft Excel'
    },
    word: {
      primary: '#185abd',
      primaryDark: '#124696',
      primaryLight: '#deebf7',
      textSuccess: '#1e4e79',
      bgError: '#fce4d6',
      textError: '#c00000',
      fileName: 'Quiz_Word_Traitement.docx',
      software: 'Microsoft Word'
    }
  }[activeTab] ?? {
    primary: '#107c41',
    primaryDark: '#0b5930',
    primaryLight: '#e2f0d9',
    textSuccess: '#385723',
    bgError: '#fce4d6',
    textError: '#c00000',
    fileName: 'Quiz_Excel_Bases.xlsx',
    software: 'Microsoft Excel'
  };

  if (!quizData[currentQuestion]) {
    return <div className={`min-h-screen flex items-center justify-center text-gray-400 font-mono text-lg ${activeTab === 'excel' ? 'excel-bg' : 'word-bg'}`}>Chargement…</div>;
  }

  return (
    <div className={`min-h-screen py-8 px-4 font-sans selection:bg-gray-200 ${activeTab === 'excel' ? 'excel-bg' : 'word-bg'}`}> 
      {showConfetti && (
        <>
          <span className="confetti" style={{ left: '45%' }}>🎉</span>
          <span className="confetti" style={{ left: '55%' }}>🎊</span>
          <span className="confetti" style={{ left: '50%' }}>✨</span>
        </>
      )}
      
      {/* BARRE DE NAVIGATION COMMUNE (Sélecteur d'application) */}
      <div className="max-w-2xl mx-auto mb-6 bg-white border border-gray-300 shadow-sm rounded-sm p-1.5 flex gap-2">
        <button
          onClick={() => handleTabChange('excel')}
          className={`flex-1 py-2 px-4 rounded-sm text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'excel'
              ? 'bg-[#107c41] text-white shadow-sm cursor-default'
              : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
          }`}
        >
          <span className="font-mono text-xs">📊</span> Module 1 : Excel
        </button>
        <button
          onClick={() => handleTabChange('word')}
          className={`flex-1 py-2 px-4 rounded-sm text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'word'
              ? 'bg-[#185abd] text-white shadow-sm cursor-default'
              : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
          }`}
        >
          <span className="font-mono text-xs">📝</span> Module 2 : Word
        </button>
      </div>

      {/* BARRE DE PROGRESSION DES QUESTIONS */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden border border-gray-300">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + (showResults ? 1 : 0)) / quizData.length) * 100}%`,
              backgroundColor: theme.primary
            }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
          <span>Question {Math.min(currentQuestion + 1, quizData.length)} / {quizData.length}</span>
          <span>{showResults ? 'Terminé' : 'En cours'}</span>
        </div>
      </div>

      {/* --- ÉCRAN FINAL (RAPPORT) --- */}
      {showResults ? (
        <>
          {showBigConfetti && (
            <>
              <span className="confetti-xxl" style={{ left: '40%' }}>🎉</span>
              <span className="confetti-xxl" style={{ left: '60%' }}>🎊</span>
              <span className="confetti-xxl" style={{ left: '50%' }}>🏆</span>
              <div className="fixed inset-0 flex flex-col items-center justify-center z-[10001] pointer-events-none">
                <div className="text-4xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 animate-bounce">PERFECT!</div>
                <div className="text-xl sm:text-2xl font-bold text-white bg-yellow-500/90 px-6 py-2 rounded-full shadow-lg animate-fadeIn">10/10 – Score Parfait !</div>
              </div>
            </>
          )}
          <div className="max-w-2xl mx-auto bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
            <div 
              className="text-white px-6 py-4 flex items-center justify-between transition-colors duration-300"
              style={{ backgroundColor: theme.primary }}
            >
              <h1 className="text-md font-semibold tracking-wide">Rapport d'Évaluation — Final</h1>
              <span className="text-xs px-2 py-1 rounded-sm" style={{ backgroundColor: theme.primaryDark }}>Généré</span>
            </div>
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Module {theme.software} validé</h2>
              <p className="text-gray-400 mb-6 text-xs font-mono">ID_SESSION: {activeTab.toUpperCase()}_2026</p>
              <div className="inline-block bg-gray-50 border border-gray-300 p-6 rounded-sm mb-6 min-w-[220px]">
                <span className="text-xs text-gray-400 block uppercase font-mono tracking-wider mb-1">Score Pratique</span>
                <span className="text-4xl font-bold" style={{ color: theme.primary }}>
                  {score} <span className="text-xl text-gray-300">/ {quizData.length}</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 h-5 mb-8 border border-gray-300 p-[2px] rounded-sm">
                <div 
                  className="h-full transition-all duration-700 ease-out" 
                  style={{ width: `${(score / quizData.length) * 100}%`, backgroundColor: theme.primary }}
                ></div>
              </div>
              <button
                onClick={restartQuiz}
                className="text-white text-sm font-medium px-6 py-2.5 transition shadow-sm rounded-sm cursor-pointer"
                style={{ backgroundColor: theme.primary }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = theme.primaryDark}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = theme.primary}
              >
                Recommencer le module {activeTab === 'excel' ? 'Excel' : 'Word'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto bg-white border border-gray-300 shadow-md rounded-sm overflow-hidden">
          {/* Ruban Supérieur */}
          <div className="text-white px-6 py-4 transition-colors duration-300" style={{ backgroundColor: theme.primary }}>
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-medium tracking-wide">{theme.software} — {theme.fileName}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm" style={{ backgroundColor: theme.primaryDark }}>
                {activeTab === 'excel' ? 'Formules Actives' : 'Mise en page ok'}
              </span>
            </div>
            <div className="flex gap-4 text-xs mt-3 pt-2 border-t border-white/20 text-gray-200">
              <span className="font-semibold text-white border-b-2 border-white pb-1 cursor-default">Questionnaire</span>
              <span className="opacity-60 cursor-default">Révision</span>
              <span className="opacity-60 cursor-default">Outils</span>
            </div>
          </div>

          {/* Barre de formule / d'insertion (Zone d'affichage de la question) */}
          <div className="bg-gray-50 border-b border-gray-300 px-6 py-2.5 flex items-center gap-3 text-sm font-mono">
            <span className="font-bold text-gray-500 bg-white border border-gray-300 px-2 py-0.5 rounded-sm">
              Q{currentQuestion + 1}
            </span>
            <span className="text-gray-300">{activeTab === 'excel' ? 'fx |' : '📝 |'}</span>
            <p className="text-gray-700 font-sans font-medium flex-1 leading-snug">{quizData[currentQuestion].question}</p>
          </div>

          <div className="p-6">
            <div className="flex justify-between text-[11px] text-gray-400 mb-4 font-mono">
              <span>Index : {currentQuestion + 1} sur {quizData.length}</span>
              <span>Points : {score}</span>
            </div>

            {/* Liste des choix */}
            <div className="border border-gray-200 rounded-sm overflow-hidden divide-y divide-gray-200 shadow-sm">
              {quizData[currentQuestion].options.map((option: string, index: number) => {
                let buttonStyle = "w-full text-left px-4 py-3.5 text-xs sm:text-sm transition-all flex items-start gap-3 ";
                let inlineStyle = {};
                if (!isAnswered) {
                  buttonStyle += "bg-white hover:bg-gray-50 text-gray-700";
                } else {
                  if (option === quizData[currentQuestion].answer) {
                    buttonStyle += "font-semibold";
                    inlineStyle = { backgroundColor: theme.primaryLight, color: theme.textSuccess };
                  } else if (option === selectedAnswer && selectedAnswer !== quizData[currentQuestion].answer) {
                    buttonStyle += "font-semibold";
                    inlineStyle = { backgroundColor: theme.bgError, color: theme.textError };
                  } else {
                    buttonStyle += "bg-white text-gray-300 opacity-40";
                  }
                }
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered}
                    className={buttonStyle + ' cursor-pointer'}
                    style={inlineStyle}
                  >
                    <span className={`font-mono text-xs px-1.5 py-0.5 border rounded-sm mt-0.5 ${isAnswered ? 'border-transparent' : 'bg-gray-50 text-gray-400'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Boîte de dialogue d'explication pédagogique */}
            {isAnswered && (
              <div className="mt-6 border border-amber-200 bg-amber-50 text-amber-800 p-4 rounded-sm">
                <div className="flex gap-2.5">
                  <span className="font-bold text-xs bg-amber-400 text-white w-5 h-5 flex items-center justify-center rounded-full shrink-0">i</span>
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-amber-900 mb-0.5">Note de correction :</p>
                    <p className="text-gray-600 leading-relaxed text-xs">{quizData[currentQuestion].rationale}</p>
                  </div>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 text-white font-medium text-xs px-4 py-2 transition ml-auto block rounded-sm shadow-sm cursor-pointer"
                  style={{ backgroundColor: theme.primary }}
                >
                  {currentQuestion + 1 === quizData.length ? "Terminer l'évaluation" : "Passer à l'élément suivant"}
                </button>
              </div>
            )}
          </div>

          {/* Barre d'état inférieure bureautique */}
          <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-[10px] text-gray-400 flex justify-between items-center font-mono">
            <div className="flex gap-4">
              <span className="font-bold" style={{ color: theme.primary }}>● {activeTab === 'excel' ? 'Feuil1' : 'Page 1'}</span>
              <span>Macro: Inactif</span>
            </div>
            <span>Système Synchrone</span>
          </div>
        </div>
      )}
    </div>
  );
}