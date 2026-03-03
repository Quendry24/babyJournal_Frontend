/**
 * ============================================================
 * FICHIER : SanteForm.js
 * ============================================================
 *
 * C'EST QUOI ?
 * Le formulaire qui s'affiche quand on clique sur "Santé".
 * Permet de noter l'heure, les symptômes, les traitements,
 * la température (avec checkbox) et des commentaires.
 *
 * ============================================================
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from './colors';

export default function SanteForm() {
  // --- États du formulaire ---
  const [heure, setHeure] = useState('');              // Heure de l'observation
  const [symptomes, setSymptomes] = useState('');      // Symptômes observés
  const [traitements, setTraitements] = useState('');  // Traitements donnés
  const [hasTemperature, setHasTemperature] = useState(false); // Checkbox : a-t-on pris la température ?
  const [temperature, setTemperature] = useState('');  // Valeur de la température en °C
  const [commentaires, setCommentaires] = useState(''); // Commentaires libres

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* Champ : Heure */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Heure :
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

      {/* Champ : Symptômes */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Symptômes :
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={symptomes}
          onChangeText={setSymptomes}
        />
      </View>

      {/* Champ : Traitements */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Traitements
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={traitements}
          onChangeText={setTraitements}
        />
      </View>

      {/* ============================================================ */}
      {/* CHECKBOX TEMPÉRATURE + CHAMP °C                               */}
      {/* Même principe que la checkbox Biberon dans RepasForm           */}
      {/* Quand on coche, on peut ensuite saisir la température         */}
      {/* ============================================================ */}
      <View className="flex-row items-center mb-4 gap-3">
        {/* La checkbox */}
        <TouchableOpacity
          onPress={() => setHasTemperature(!hasTemperature)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            borderWidth: 1.5,
            borderColor: COLORS.primary,
            backgroundColor: hasTemperature ? COLORS.primary : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasTemperature && (
            <Text style={{ color: COLORS.white, fontSize: 12 }}>✓</Text>
          )}
        </TouchableOpacity>

        <Text className="text-sm" style={{ color: COLORS.text }}>
          Temperature
        </Text>

        {/* Champ pour saisir la valeur en °C */}
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={temperature}
          onChangeText={setTemperature}
          placeholder="°C"
          keyboardType="numeric"
        />
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
          // TODO: connecter au backend pour sauvegarder les données santé
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
