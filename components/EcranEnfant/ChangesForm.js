/**
 * ============================================================
 * FICHIER : ChangesForm.js
 * ============================================================
 *
 * C'EST QUOI ?
 * Le formulaire qui s'affiche quand on clique sur "Changes" (les couches).
 * Permet de noter l'heure du change, le type (urine, selle, mixte, crème)
 * et des commentaires.
 *
 * PARTICULARITÉ :
 * Les boutons de type (URINE, SELLE, MIXTE, CREME) sont des "toggles" :
 * - On peut en sélectionner PLUSIEURS en même temps (ex: URINE + CREME)
 * - Quand on clique sur un type déjà sélectionné, il se désélectionne
 * - Sélectionné = fond orange (#FFA424), non sélectionné = fond gris clair
 *
 * ============================================================
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from './colors';

// --- Liste des types de change possibles ---
// C'est un tableau simple. On boucle dessus pour créer les boutons.
const changeTypes = ['URINE', 'SELLE', 'MIXTE', 'CREME'];

export default function ChangesForm() {
  // --- États du formulaire ---
  const [heure, setHeure] = useState('');              // Heure du change (ex: "14:30")
  const [selectedTypes, setSelectedTypes] = useState([]); // Types sélectionnés (tableau, ex: ['URINE', 'CREME'])
  const [commentaires, setCommentaires] = useState('');    // Commentaires libres

  /**
   * Fonction toggleType : ajoute ou retire un type de la liste des sélectionnés.
   *
   * Comment ça marche :
   * - Si le type est déjà dans le tableau → on le retire (filter)
   * - Si le type n'est PAS dans le tableau → on l'ajoute (spread + push)
   *
   * Exemple :
   *   selectedTypes = ['URINE']
   *   toggleType('CREME')  → selectedTypes devient ['URINE', 'CREME']
   *   toggleType('URINE')  → selectedTypes devient ['CREME']
   */
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)  // Retire le type
        : [...prev, type]                 // Ajoute le type
    );
  };

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* Champ : Heure du change */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Heure du change :
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={heure}
          onChangeText={setHeure}
          placeholder="HH:MM"
        />
      </View>

      {/* ============================================================ */}
      {/* BOUTONS DE TYPE DE CHANGE (URINE, SELLE, MIXTE, CREME)       */}
      {/* On boucle sur le tableau changeTypes pour créer un bouton     */}
      {/* pour chacun. Chaque bouton change de couleur selon qu'il      */}
      {/* est sélectionné ou non.                                       */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>
          Types :
        </Text>
        {/* flex-row = les boutons sont sur une ligne horizontale */}
        {/* flex-wrap = si ça dépasse, ça passe à la ligne suivante */}
        <View className="flex-row flex-wrap gap-2">
          {changeTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => toggleType(type)}
              style={{
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                // Si ce type est sélectionné → fond orange (#FFA424)
                // Sinon → fond gris clair (#E8E8E8)
                backgroundColor: selectedTypes.includes(type)
                  ? COLORS.orange
                  : COLORS.lightGrey,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  // Si sélectionné → texte blanc (pour se voir sur fond orange)
                  // Sinon → texte noir
                  color: selectedTypes.includes(type) ? COLORS.white : COLORS.text,
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Zone de commentaires */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
          Commentaires:
        </Text>
        <TextInput
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            minHeight: 80,
            textAlignVertical: 'top',
          }}
          multiline
          value={commentaires}
          onChangeText={setCommentaires}
        />
      </View>

      {/* Bouton ENREGISTRER */}
      <TouchableOpacity
        className="rounded-full py-3 items-center"
        style={{ backgroundColor: COLORS.orange }}
        onPress={() => {
          // TODO: connecter au backend pour sauvegarder le change
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
