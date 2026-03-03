/**
 * ============================================================
 * FICHIER : NotesNounouForm.js
 * ============================================================
 *
 * C'EST QUOI ?
 * Le formulaire qui s'affiche quand on clique sur "Notes Nounou".
 * Permet à la nounou de noter les fournitures et vêtements de l'enfant
 * et d'ajouter des commentaires.
 *
 * LES DROPDOWNS :
 * Les 2 dropdowns (Fournitures et Vêtements) sont des FAUX dropdowns
 * pour l'instant. Ils ressemblent à des menus déroulants mais ne font rien
 * quand on clique. Il faudra les remplacer par un vrai Picker ou
 * une modale de sélection plus tard.
 *
 * ============================================================
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// ChevronDown = petite flèche vers le bas (icône ˅) pour simuler un dropdown
import { ChevronDown } from 'lucide-react-native';
import { COLORS } from './colors';

export default function NotesNounouForm() {
  // --- État du formulaire ---
  // Pour l'instant on n'a que les commentaires comme état
  // Les dropdowns seront ajoutés quand on les connectera
  const [commentaires, setCommentaires] = useState('');

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* ============================================================ */}
      {/* DROPDOWN FOURNITURES (faux — juste visuel)                    */}
      {/* Affiche un rectangle blanc avec le texte et une flèche ˅      */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Fournitures :
        </Text>
        {/* Ce TouchableOpacity simule un dropdown — il ne fait rien pour l'instant */}
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg px-3 py-3"
          style={{ borderWidth: 1, borderColor: COLORS.border }}
        >
          {/* Texte placeholder gris */}
          <Text style={{ color: '#999' }}>Sélectionner...</Text>
          {/* Flèche vers le bas */}
          <ChevronDown size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* DROPDOWN VÊTEMENTS (faux — même principe que Fournitures) */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Vêtements :
        </Text>
        <TouchableOpacity
          className="flex-row items-center justify-between bg-white rounded-lg px-3 py-3"
          style={{ borderWidth: 1, borderColor: COLORS.border }}
        >
          <Text style={{ color: '#999' }}>Sélectionner...</Text>
          <ChevronDown size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Zone de commentaires */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
          Commentaires:
        </Text>
        <TextInput
          className="bg-white rounded-lg p-3"
          style={{
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
          // TODO: connecter au backend pour sauvegarder les notes nounou
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
