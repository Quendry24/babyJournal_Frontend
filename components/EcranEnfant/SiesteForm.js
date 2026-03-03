/**
 * ============================================================
 * FICHIER : SiesteForm.js
 * ============================================================
 *
 * C'EST QUOI ?
 * Le formulaire qui s'affiche quand on clique sur "Sieste".
 * Permet de noter l'heure de coucher, l'heure de réveil,
 * l'humeur de l'enfant et des commentaires.
 *
 * STRUCTURE : identique aux autres formulaires (fond gris, champs, bouton ENREGISTRER)
 * ============================================================
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from './colors';
import HumeurSelector from './HumeurSelector';

export default function SiesteForm() {
  // --- États du formulaire ---
  const [couche, setCouche] = useState('');       // Heure à laquelle l'enfant s'est couché
  const [reveil, setReveil] = useState('');       // Heure à laquelle l'enfant s'est réveillé
  const [humeur, setHumeur] = useState(null);      // Humeur au réveil ('happy', 'neutral', 'sad' ou null)
  const [commentaires, setCommentaires] = useState(''); // Commentaires libres

  return (
    // Conteneur du formulaire avec fond gris (#D9D9D9)
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* Champ : Heure de coucher */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Couché
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={couche}
          onChangeText={setCouche}
          placeholder="HH:MM"
        />
      </View>

      {/* Champ : Heure de réveil */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Réveil
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={reveil}
          onChangeText={setReveil}
          placeholder="HH:MM"
        />
      </View>

      {/* Sélecteur d'humeur (3 smileys) */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>
          Humeur
        </Text>
        <HumeurSelector selected={humeur} onSelect={setHumeur} />
      </View>

      {/* Zone de commentaires (texte libre, multi-lignes) */}
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

      {/* Bouton ENREGISTRER (orange #FFA424, arrondi) */}
      <TouchableOpacity
        className="rounded-full py-3 items-center"
        style={{ backgroundColor: COLORS.orange }}
        onPress={() => {
          // TODO: connecter au backend pour sauvegarder la sieste
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
