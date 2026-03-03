/**
 * ============================================================
 * FICHIER : HumeurSelector.js
 * ============================================================
 *
 * C'EST QUOI CE COMPOSANT ?
 * -------------------------
 * C'est une rangée de 3 smileys (content, neutre, triste) cliquables.
 * Quand la nounou clique sur un smiley, il devient coloré (sélectionné).
 * Les autres restent transparents.
 *
 * OÙ EST-IL UTILISÉ ?
 * --------------------
 * - Dans RepasForm.js (humeur pendant le repas)
 * - Dans SiesteForm.js (humeur au réveil)
 * - Dans ActivitesForm.js (humeur pendant l'activité)
 *
 * COMMENT ÇA MARCHE ?
 * --------------------
 * Ce composant reçoit 2 "props" (= paramètres) depuis son parent :
 *   - selected : l'humeur actuellement choisie ('happy', 'neutral', 'sad', ou null si aucune)
 *   - onSelect : la fonction à appeler quand on clique sur un smiley
 *
 * Exemple d'utilisation dans un autre fichier :
 *   <HumeurSelector selected={humeur} onSelect={setHumeur} />
 *
 * ============================================================
 */

// --- IMPORTS ---
// React : la bibliothèque de base pour créer des composants
import React from 'react';
// View = une "boîte" invisible pour organiser les éléments
// TouchableOpacity = un bouton qui devient un peu transparent quand on appuie
import { View, TouchableOpacity } from 'react-native';
// Smile, Meh, Frown = les 3 icônes de smiley (de la bibliothèque lucide)
// Smile = 😊, Meh = 😐, Frown = 😞
import { Smile, Meh, Frown } from 'lucide-react-native';
// On importe nos couleurs depuis colors.js
import { COLORS } from './colors';

// --- LISTE DES 3 HUMEURS ---
// Chaque humeur a :
//   - un id : pour savoir laquelle est sélectionnée
//   - une Icon : le composant smiley à afficher
const moods = [
  { id: 'happy', Icon: Smile },     // Content 😊
  { id: 'neutral', Icon: Meh },     // Neutre 😐
  { id: 'sad', Icon: Frown },       // Triste 😞
];

/**
 * Composant HumeurSelector
 *
 * @param {string|null} selected - L'humeur actuellement sélectionnée ('happy', 'neutral', 'sad') ou null
 * @param {function} onSelect - Fonction appelée avec l'id de l'humeur cliquée
 */
export default function HumeurSelector({ selected, onSelect }) {
  return (
    // Conteneur horizontal (flex-row) avec un espace de 4 entre chaque smiley (gap-4)
    <View className="flex-row items-center gap-4">

      {/* On boucle sur les 3 humeurs et on crée un bouton rond pour chacune */}
      {moods.map(({ id, Icon }) => (
        <TouchableOpacity
          // "key" est obligatoire quand on fait une boucle en React (pour que React sache quel élément est lequel)
          key={id}
          // Quand on appuie sur le smiley, on appelle onSelect avec son id
          // Ex: si on clique sur le smiley content, ça fait onSelect('happy')
          onPress={() => onSelect(id)}
          style={{
            // --- Forme du bouton : un cercle de 44x44 pixels ---
            width: 44,
            height: 44,
            borderRadius: 22,  // borderRadius = moitié de width = cercle parfait
            // --- On centre l'icône dans le cercle ---
            alignItems: 'center',       // centre horizontalement
            justifyContent: 'center',   // centre verticalement
            // --- Couleur de fond ---
            // Si ce smiley est sélectionné → fond coloré (primary = brun #B36444)
            // Sinon → fond transparent (on voit juste le contour)
            backgroundColor: selected === id ? COLORS.primary : 'transparent',
            // --- Bordure du cercle ---
            borderWidth: 1.5,  // épaisseur de la bordure
            // La bordure est toujours de couleur primary (brun)
            borderColor: selected === id ? COLORS.primary : COLORS.primary,
          }}
        >
          {/* L'icône smiley elle-même */}
          <Icon
            size={26}  // taille de l'icône en pixels
            // Si le smiley est sélectionné → icône blanche (pour contraster avec le fond coloré)
            // Sinon → icône de couleur primary (brun)
            color={selected === id ? COLORS.white : COLORS.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
