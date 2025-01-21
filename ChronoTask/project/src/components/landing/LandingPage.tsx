import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, Users, BarChart2 } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">MaVieOrganisée</div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Connexion
          </Link>
          <Link
            to="/signup"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            Essayer gratuitement
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Organisez votre vie en{' '}
            <span className="text-emerald-400">quelques minutes</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Une application intelligente qui vous aide à gérer votre temps, vos tâches
            et vos objectifs de manière efficace et personnalisée.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transform hover:scale-105 transition-all"
          >
            Commencer maintenant
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Gestion des tâches
            </h3>
            <p className="text-gray-400">
              Organisez vos tâches avec un système intuitif de drag-and-drop et des
              priorités claires.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Suivi des objectifs
            </h3>
            <p className="text-gray-400">
              Définissez et suivez vos objectifs avec des étapes claires et des
              indicateurs de progression.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Routines personnalisées
            </h3>
            <p className="text-gray-400">
              Créez des routines quotidiennes adaptées à votre rythme de vie et vos
              objectifs.
            </p>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Ce que disent nos utilisateurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="text-yellow-400 fill-current"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Cette application a complètement changé ma façon de gérer mon temps.
                  Je suis beaucoup plus productif et organisé maintenant."
                </p>
                <div className="text-sm text-gray-400">- Utilisateur {i}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">Tarifs simples</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-2">Gratuit</h3>
              <div className="text-4xl font-bold text-white mb-6">0€</div>
              <ul className="text-gray-300 space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-2" size={20} />
                  Gestion des tâches basique
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-2" size={20} />
                  Calendrier personnel
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-2" size={20} />
                  3 objectifs maximum
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
              >
                Commencer gratuitement
              </Link>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">9.99€</div>
              <ul className="text-white space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-white mr-2" size={20} />
                  Toutes les fonctionnalités gratuites
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-white mr-2" size={20} />
                  Objectifs illimités
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-white mr-2" size={20} />
                  Analyses avancées
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-white mr-2" size={20} />
                  Support prioritaire
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white text-emerald-500 px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                Commencer l'essai Pro
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};