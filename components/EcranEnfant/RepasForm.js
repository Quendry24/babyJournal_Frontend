/**
 * ============================================================
 * FICHIER : RepasForm.js
 * ============================================================
 *
 * C'EST QUOI CE COMPOSANT ?
 * -------------------------
 * C'est le formulaire qui s'affiche quand la nounou clique sur le bouton "Repas"
 * dans l'écran enfant. Il permet de noter les infos du repas d'un enfant.
 *
 * CE QU'IL CONTIENT :
 * -------------------
 * 1. Un champ "Heure du repas" (ex: 12:30)
 * 2. Un sélecteur d'humeur (3 smileys : content, neutre, triste)
 * 3. Une checkbox "Biberon" avec un champ pour la quantité en ml
 * 4. Une zone de commentaires (texte libre)
 * 5. Un bouton "ENREGISTRER" (orange #FFA424)
 *
 * COMMENT ÇA FONCTIONNE ?
 * ------------------------
 * Chaque champ a son propre "état" (useState). Quand l'utilisateur tape du texte
 * ou coche une case, l'état se met à jour et l'affichage change en temps réel.
 *
 * Le bouton ENREGISTRER est préparé mais pas encore connecté au backend.
 * Quand le backend sera prêt, il faudra ajouter l'appel API dans le onPress.
 *
 * ============================================================
 */

// --- IMPORTS ---
// React et useState : React pour créer le composant, useState pour gérer les données du formulaire
import React, { useState } from 'react';
// View = boîte invisible, Text = texte, TextInput = champ de saisie, TouchableOpacity = bouton
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// COLORS = notre palette de couleurs (voir colors.js)
import { COLORS } from './colors';
// HumeurSelector = les 3 smileys (voir HumeurSelector.js)
import HumeurSelector from './HumeurSelector';

export default function RepasForm() {
  // ============================================================
  // ÉTATS DU FORMULAIRE
  // ============================================================
  // useState crée une variable + une fonction pour la modifier.
  // Exemple : const [heureRepas, setHeureRepas] = useState('');
  //   - heureRepas = la valeur actuelle (commence vide '')
  //   - setHeureRepas = la fonction pour changer la valeur
  //   - useState('') = la valeur initiale (ici une chaîne vide)

  const [heureRepas, setHeureRepas] = useState('');    // L'heure saisie par l'utilisateur (ex: "12:30")
  const [humeur, setHumeur] = useState(null);           // L'humeur choisie ('happy', 'neutral', 'sad' ou null)
  const [biberon, setBiberon] = useState(false);        // Est-ce que la case biberon est cochée ? (true/false)
  const [ml, setMl] = useState('');                     // La quantité de lait en ml (ex: "150")
  const [commentaires, setCommentaires] = useState(''); // Le texte libre des commentaires

  return (
    // ============================================================
    // CONTENEUR PRINCIPAL DU FORMULAIRE
    // ============================================================
    // rounded-2xl = coins très arrondis
    // p-4 = padding (espace intérieur) de 16px partout
    // mb-4 = marge en bas de 16px
    // backgroundColor: COLORS.formBg = fond gris (#D9D9D9)
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.formBg }}
    >
      {/* ============================================================ */}
      {/* CHAMP : Heure du repas                                        */}
      {/* C'est un TextInput avec juste une ligne en bas (pas de cadre) */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1" style={{ color: COLORS.text }}>
          Heure du repas
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,      // ligne en bas du champ seulement
            borderColor: COLORS.border, // couleur de la ligne (gris)
            color: COLORS.text,         // couleur du texte tapé (noir)
            paddingVertical: 4,         // petit espace en haut et en bas du texte
            fontSize: 14,              // taille du texte
          }}
          value={heureRepas}           // la valeur affichée dans le champ
          onChangeText={setHeureRepas} // quand l'utilisateur tape, ça met à jour heureRepas
          placeholder="HH:MM"         // texte grisé affiché quand le champ est vide
        />
      </View>

      {/* ============================================================ */}
      {/* SÉLECTEUR D'HUMEUR (3 smileys)                               */}
      {/* On utilise le composant HumeurSelector qu'on a créé           */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>
          Humeur
        </Text>
        {/* selected = l'humeur actuelle, onSelect = la fonction pour la changer */}
        <HumeurSelector selected={humeur} onSelect={setHumeur} />
      </View>

      {/* ============================================================ */}
      {/* CHECKBOX BIBERON + CHAMP ML                                   */}
      {/* Une ligne horizontale avec : checkbox, texte "Biberon", input */}
      {/* ============================================================ */}
      <View className="flex-row items-center mb-4 gap-3">
        {/* --- La checkbox (carré cliquable avec coche) --- */}
        <TouchableOpacity
          // Quand on appuie, on inverse la valeur : true → false, false → true
          onPress={() => setBiberon(!biberon)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,                                    // petits coins arrondis (carré arrondi)
            borderWidth: 1.5,                                   // épaisseur de la bordure
            borderColor: COLORS.primary,                        // bordure brun (#B36444)
            backgroundColor: biberon ? COLORS.primary : 'transparent', // si coché → fond brun, sinon → transparent
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Si la case est cochée, on affiche un ✓ blanc */}
          {biberon && <Text style={{ color: COLORS.white, fontSize: 12 }}>✓</Text>}
        </TouchableOpacity>

        {/* Le texte "Biberon" à côté de la checkbox */}
        <Text className="text-sm" style={{ color: COLORS.text }}>Biberon</Text>

        {/* --- Champ pour saisir la quantité en ml --- */}
        <TextInput
          style={{
            flex: 1,                    // prend tout l'espace restant sur la ligne
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 4,
            fontSize: 14,
            textAlign: 'center',        // le texte est centré dans le champ
          }}
          value={ml}
          onChangeText={setMl}
          placeholder="___"
          keyboardType="numeric"        // affiche le clavier numérique sur le téléphone
        />

        {/* L'unité "ml" affichée à droite */}
        <Text className="text-sm" style={{ color: COLORS.text }}>ml</Text>
      </View>

      {/* ============================================================ */}
      {/* ZONE DE COMMENTAIRES                                          */}
      {/* Un grand champ de texte multi-lignes avec fond blanc           */}
      {/* ============================================================ */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
          Commentaires:
        </Text>
        <TextInput
          style={{
            backgroundColor: COLORS.white,  // fond blanc
            borderRadius: 8,                // coins arrondis
            padding: 12,                    // espace intérieur
            borderWidth: 1,                 // bordure fine
            borderColor: COLORS.border,     // bordure grise
            color: COLORS.text,             // texte noir
            minHeight: 80,                  // hauteur minimale (pour que ça soit assez grand)
            textAlignVertical: 'top',       // le texte commence en haut (pas au milieu)
          }}
          multiline                         // permet d'écrire sur plusieurs lignes
          value={commentaires}
          onChangeText={setCommentaires}
        />
      </View>

      {/* ============================================================ */}
      {/* BOUTON ENREGISTRER                                            */}
      {/* Bouton arrondi orange (#FFA424) en bas du formulaire          */}
      {/* ============================================================ */}
      <TouchableOpacity
        className="rounded-full py-3 items-center"  // rounded-full = très arrondi, py-3 = padding vertical
        style={{ backgroundColor: COLORS.orange }}    // fond orange vif
        onPress={() => {
          // TODO: Ici il faudra ajouter l'appel au backend pour sauvegarder les données
          // Exemple futur :
          // await api.post('/repas', { heureRepas, humeur, biberon, ml, commentaires });
        }}
      >
        <Text className="text-white font-bold text-base">ENREGISTRER</Text>
      </TouchableOpacity>
    </View>
  );
}
