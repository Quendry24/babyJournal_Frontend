/**
 * ============================================================
 * FICHIER : ActivitesForm.js
 * ============================================================
 *
 * C'EST QUOI ?
 * Le formulaire qui s'affiche quand on clique sur "Activités".
 * Permet de noter le nom de l'activité, l'humeur, ajouter des photos
 * et écrire des commentaires.
 *
 * NOTE SUR LES PHOTOS :
 * Les 2 zones photo sont des PLACEHOLDERS (faux boutons avec une icône montagne).
 * Pour l'instant on ne peut pas encore prendre/choisir de vraies photos.
 * Il faudra plus tard connecter un image picker (expo-image-picker par exemple).
 *
 * ============================================================
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// Mountain = icône de montagne, utilisée comme placeholder pour les photos
import { Mountain } from 'lucide-react-native';
import { COLORS } from './colors';
import HumeurSelector from './HumeurSelector';

export default function ActivitesForm() {
  // --- États du formulaire ---
  const [activite, setActivite] = useState('');         // Nom de l'activité (ex: "Peinture")
  const [humeur, setHumeur] = useState(null);            // Humeur pendant l'activité
  const [commentaires, setCommentaires] = useState('');  // Commentaires libres

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* Champ : Nom de l'activité */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Activité :
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
          }}
          value={activite}
          onChangeText={setActivite}
        />
      </View>

      {/* Sélecteur d'humeur (3 smileys) */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>
          Humeur
        </Text>
        <HumeurSelector selected={humeur} onSelect={setHumeur} />
      </View>

      {/* ============================================================ */}
      {/* PLACEHOLDERS PHOTOS                                           */}
      {/* 2 carrés gris clair avec une icône montagne dedans            */}
      {/* Ce sont des faux boutons — à remplacer par un vrai picker     */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>
          Photos :
        </Text>
        <View className="flex-row gap-3">
          {/* Photo 1 — placeholder */}
          <TouchableOpacity
            style={{
              width: 80,                        // 80x80 pixels
              height: 80,
              borderRadius: 8,                  // coins arrondis
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.lightGrey, // fond gris clair
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            {/* Icône montagne = symbole classique pour "ajouter une photo" */}
            <Mountain size={32} color={COLORS.primary} />
          </TouchableOpacity>

          {/* Photo 2 — placeholder (même style que photo 1) */}
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.lightGrey,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Mountain size={32} color={COLORS.primary} />
          </TouchableOpacity>
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
          // TODO: connecter au backend pour sauvegarder l'activité
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
