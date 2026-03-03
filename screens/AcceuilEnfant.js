/**
 * ============================================================
 * FICHIER : AcceuilEnfant.js
 * ============================================================
 *
 * C'EST QUOI ?
 * C'est l'ÉCRAN PRINCIPAL de la fiche d'un enfant.
 * C'est la première chose que la nounou voit quand elle clique
 * sur un enfant dans la liste.
 *
 * QU'EST-CE QU'IL AFFICHE ?
 * 1. Un HEADER en haut avec une flèche retour (←)
 * 2. Le PRÉNOM et l'ÂGE de l'enfant en gros titre
 * 3. 6 BOUTONS de catégorie en grille 3x2 :
 *    - Repas, Sieste, Changes, Santé, Activités, Notes Nounou
 * 4. En dessous des boutons :
 *    - Par défaut : la FICHE INFO de l'enfant (âge, poids, allergies, contacts)
 *    - Quand on clique un bouton : le FORMULAIRE correspondant remplace la fiche
 *
 * COMMENT MARCHENT LES BOUTONS ?
 * - Au départ aucun bouton n'est sélectionné → on voit la fiche enfant
 * - Si on clique sur "Repas" → le bouton devient blanc et on voit RepasForm
 * - Si on re-clique sur "Repas" → il se désélectionne → retour à la fiche
 * - Si on clique sur "Sieste" alors que "Repas" est actif → on passe à SiesteForm
 *
 * COMMENT MARCHE LA FLÈCHE RETOUR (←) ?
 * - Si un formulaire est ouvert → ça ferme le formulaire (retour à la fiche)
 * - Si on est sur la fiche (aucun formulaire) → ça revient à l'écran précédent
 *
 * FONCTIONNALITÉS SPÉCIALES :
 * - Les checkboxes Arrivée/Départ affichent l'heure automatiquement quand on coche
 * - Les boutons Mère/Père ouvrent un popup (Modal) avec le numéro et un bouton Appeler
 * - Les données de l'enfant viennent de route.params (navigation) pour le futur backend
 *
 * ============================================================
 */

// --- IMPORTS ---
// React + le hook useState pour gérer les états du formulaire
import React, { useState } from 'react';

// Composants de base de React Native :
// - View        = une <div> (un conteneur invisible)
// - Text        = du texte affiché à l'écran
// - TextInput   = un champ de saisie (input)
// - TouchableOpacity = un bouton qui devient semi-transparent quand on appuie
// - ScrollView  = une zone scrollable (pour pouvoir défiler la page)
// - SafeAreaView = un conteneur qui évite l'encoche (notch) sur iPhone
// - Platform    = pour savoir si on est sur iOS ou Android (utile pour les ombres)
// - Modal       = une fenêtre popup qui s'affiche par-dessus le reste
// - Linking     = pour ouvrir des liens externes (ici : appeler un numéro de tél)
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
  Linking,
} from 'react-native';

// Icônes de la librairie lucide-react-native :
// - ArrowLeft = flèche vers la gauche ← (bouton retour)
// - Phone     = icône de téléphone 📞 (bouton appeler)
// - X         = croix ✕ (bouton fermer le popup)
import { ArrowLeft, Phone, X } from 'lucide-react-native';

// --- IMPORTS DES 6 FORMULAIRES DE CATÉGORIE ---
// Chaque formulaire est dans son propre fichier, dans le dossier EcranEnfant
// Quand on clique sur un bouton catégorie, on affiche le formulaire correspondant
import RepasForm from '../components/EcranEnfant/RepasForm';
import SiesteForm from '../components/EcranEnfant/SiesteForm';
import ChangesForm from '../components/EcranEnfant/ChangesForm';
import SanteForm from '../components/EcranEnfant/SanteForm';
import ActivitesForm from '../components/EcranEnfant/ActivitesForm';
import NotesNounouForm from '../components/EcranEnfant/NotesNounouForm';

// Notre palette de couleurs centralisée (voir colors.js pour les détails)
import { COLORS } from '../components/EcranEnfant/colors';

/**
 * ============================================================
 * DÉFINITION DES 6 CATÉGORIES
 * ============================================================
 *
 * C'est un simple tableau d'objets. Chaque objet a :
 * - id    : un identifiant unique (utilisé dans le code, pas affiché)
 * - label : le texte affiché sur le bouton
 *
 * On boucle sur ce tableau pour créer les boutons automatiquement
 * (au lieu de copier-coller 6 fois le même code de bouton).
 *
 * NOTE : "Notes\nNounou" → le \n fait un saut de ligne dans le texte
 * pour que ça tienne sur le bouton (sinon "Notes Nounou" est trop long).
 */
const categories = [
  { id: 'repas', label: 'Repas' },
  { id: 'sieste', label: 'Sieste' },
  { id: 'changes', label: 'Changes' },
  { id: 'sante', label: 'Santé' },
  { id: 'activites', label: 'Activités' },
  { id: 'notes', label: 'Notes\nNounou' },
];

/**
 * ============================================================
 * COMPOSANT PRINCIPAL : AcceuilEnfant
 * ============================================================
 *
 * Ce composant reçoit 2 props de React Navigation :
 *
 * @param {object} navigation - L'objet de navigation de React Navigation
 *   Permet de naviguer entre les écrans (ex: navigation.goBack() pour revenir)
 *
 * @param {object} route - L'objet qui contient les paramètres passés à cet écran
 *   On récupère les données de l'enfant via route.params.enfant
 *   Ces données viendront du backend plus tard, quand le collègue aura connecté
 *
 * Exemple d'appel depuis un autre écran :
 *   navigation.navigate('AcceuilEnfant', {
 *     enfant: {
 *       prenom: 'Léa',
 *       age: '3 ans',
 *       poids: '14 kg',
 *       allergies: 'Aucune',
 *       mere: { prenom: 'Marie', nom: 'Dupont', telephone: '06 12 34 56 78' },
 *       pere: { prenom: 'Jean', nom: 'Dupont', telephone: '06 98 76 54 32' },
 *     }
 *   });
 */
export default function AcceuilEnfant({ navigation, route }) {

  // ============================================================
  // RÉCUPÉRATION DES DONNÉES DE L'ENFANT
  // ============================================================
  //
  // route?.params?.enfant → essaie de lire les données de l'enfant
  //   passées par la navigation (le ? évite un crash si c'est undefined)
  //
  // ?? { ... } → si les données n'existent pas (pas encore de backend),
  //   on utilise ces valeurs par défaut pour que l'écran ne soit pas vide
  //
  // Plus tard, quand le backend sera connecté, route.params.enfant
  // contiendra les vraies données de l'enfant et les valeurs par défaut
  // ne seront plus utilisées.
  const enfant = route?.params?.enfant ?? {
    prenom: 'Prénom',        // sera remplacé par le vrai prénom
    age: '',                 // sera remplacé par l'âge réel
    poids: '',               // sera remplacé par le poids réel
    allergies: '',           // sera remplacé par les vraies allergies
    mere: { prenom: 'Prénom', nom: 'Nom', telephone: '06 00 00 00 00' },
    pere: { prenom: 'Prénom', nom: 'Nom', telephone: '06 00 00 00 00' },
  };

  // ============================================================
  // ÉTATS DU COMPOSANT (useState)
  // ============================================================
  // Chaque useState crée une "variable réactive" :
  // - La première valeur (ex: selectedCategory) est la valeur actuelle
  // - La deuxième valeur (ex: setSelectedCategory) est la fonction pour la modifier
  // - L'argument de useState(...) est la valeur de départ

  // --- Quel bouton catégorie est sélectionné ? ---
  // null = aucun → on affiche la fiche enfant
  // 'repas' = Repas est sélectionné → on affiche RepasForm
  // 'sieste' = Sieste est sélectionné → on affiche SiesteForm
  // etc.
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- Champs de la fiche enfant ---
  // Ces champs sont pré-remplis avec les données du backend (enfant.age, etc.)
  // Si le backend n'envoie rien, ils seront vides (chaîne vide '')
  const [age, setAge] = useState(enfant.age);
  const [poids, setPoids] = useState(enfant.poids);
  const [allergies, setAllergies] = useState(enfant.allergies);

  // --- Checkboxes Arrivée / Départ ---
  // arrivee / depart : true = coché, false = pas coché
  // arriveeHeure / departHeure : l'heure qui s'affiche à côté quand c'est coché
  const [arrivee, setArrivee] = useState(false);
  const [arriveeHeure, setArriveeHeure] = useState('');
  const [depart, setDepart] = useState(false);
  const [departHeure, setDepartHeure] = useState('');

  // --- Popup de contact ---
  // null = popup fermé
  // { label: 'Mère', prenom: 'Marie', ... } = popup ouvert avec les infos du parent
  const [contactModal, setContactModal] = useState(null);

  // ============================================================
  // DONNÉES DE CONTACT DES PARENTS
  // ============================================================
  // On prend les données de l'enfant (du backend ou valeurs par défaut)
  // et on ajoute un label (Mère / Père) pour l'affichage dans le popup
  //
  // ...enfant.mere → c'est le "spread operator" : ça copie toutes les propriétés
  // de enfant.mere (prenom, nom, telephone) dans le nouvel objet
  const parents = {
    mere: { label: 'Mère', ...enfant.mere },
    pere: { label: 'Père', ...enfant.pere },
  };

  // ============================================================
  // FONCTION : handleCall — appeler un numéro de téléphone
  // ============================================================
  //
  // Quand la nounou appuie sur "Appeler" dans le popup de contact,
  // cette fonction est exécutée.
  //
  // @param {string} numero - Le numéro au format "06 12 34 56 78"
  //
  // Comment ça marche :
  // 1. On enlève tous les espaces du numéro avec .replace(/\s/g, '')
  //    "06 12 34 56 78" → "0612345678"
  //    (Les espaces empêcheraient l'appel de fonctionner)
  //
  // 2. On utilise Linking.openURL('tel:0612345678') pour demander
  //    au téléphone d'ouvrir l'application d'appel avec ce numéro
  //    C'est comme cliquer sur un lien "tel:" dans un navigateur web
  const handleCall = (numero) => {
    const cleaned = numero.replace(/\s/g, '');
    Linking.openURL(`tel:${cleaned}`);
  };

  // ============================================================
  // FONCTION : getCurrentTime — obtenir l'heure actuelle
  // ============================================================
  //
  // Retourne l'heure actuelle au format "16:30" (fuseau horaire Paris)
  //
  // Pourquoi toLocaleTimeString et pas getHours/getMinutes ?
  // → Parce que getHours() donne l'heure UTC (décalée d'1 ou 2 heures)
  //   tandis que toLocaleTimeString avec timeZone: 'Europe/Paris' donne
  //   l'heure correcte en France (avec gestion automatique heure d'été/hiver)
  //
  // Les options :
  // - 'fr-FR'     → format français
  // - hour: '2-digit'   → heure sur 2 chiffres (ex: "09" au lieu de "9")
  // - minute: '2-digit'  → minutes sur 2 chiffres
  // - hour12: false      → format 24h (pas AM/PM)
  // - timeZone: 'Europe/Paris' → fuseau horaire France
  const getCurrentTime = () => {
    const now = new Date();
    const parts = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Paris',
    });
    return parts;
  };

  // ============================================================
  // FONCTION : toggleArrivee — cocher/décocher la case Arrivée
  // ============================================================
  //
  // Quand on COCHE la case (arrivee passe de false à true) :
  // → On enregistre l'heure actuelle dans arriveeHeure
  //   pour afficher "Arrivée ✓ 08:30" par exemple
  //
  // Quand on DÉCOCHE (arrivee passe de true à false) :
  // → On ne fait rien de spécial, l'heure reste en mémoire
  //   mais elle n'est plus affichée (car la condition {arrivee && ...}
  //   dans le JSX cache le texte quand arrivee est false)
  const toggleArrivee = () => {
    if (!arrivee) {
      // On coche → on capture l'heure actuelle
      setArriveeHeure(getCurrentTime());
    }
    // Dans tous les cas, on inverse la valeur (true ↔ false)
    setArrivee(!arrivee);
  };

  // Même logique que toggleArrivee, mais pour le Départ
  const toggleDepart = () => {
    if (!depart) {
      setDepartHeure(getCurrentTime());
    }
    setDepart(!depart);
  };

  // ============================================================
  // FONCTION : handleBack — gérer le bouton retour (←)
  // ============================================================
  //
  // Deux comportements selon le contexte :
  //
  // 1. Un formulaire est ouvert (selectedCategory n'est pas null) :
  //    → On ferme le formulaire en remettant selectedCategory à null
  //    → La fiche enfant réapparaît
  //
  // 2. Aucun formulaire n'est ouvert (selectedCategory est null) :
  //    → On appelle navigation.goBack() pour revenir à l'écran précédent
  //    → (la liste des enfants par exemple)
  const handleBack = () => {
    if (selectedCategory) {
      // Un formulaire est ouvert → on le ferme
      setSelectedCategory(null);
    } else if (navigation?.goBack) {
      // Pas de formulaire → on revient à l'écran précédent
      navigation.goBack();
    }
  };

  // ============================================================
  // FONCTION : handleCategoryPress — clic sur un bouton catégorie
  // ============================================================
  //
  // @param {string} id - L'identifiant de la catégorie cliquée (ex: 'repas')
  //
  // Comportement :
  // - Si on clique sur la catégorie DÉJÀ sélectionnée → on la désélectionne (null)
  // - Sinon → on sélectionne la nouvelle catégorie
  //
  // prev === id ? null : id
  // ↑ C'est un opérateur ternaire :
  //   "Si prev est égal à id, alors retourne null, sinon retourne id"
  //
  // On utilise la forme fonctionnelle de setState : (prev) => ...
  // car on a besoin de connaître la valeur ACTUELLE pour décider quoi faire
  const handleCategoryPress = (id) => {
    setSelectedCategory((prev) => (prev === id ? null : id));
  };

  // ============================================================
  // FONCTION : renderForm — afficher le bon formulaire
  // ============================================================
  //
  // C'est un switch/case (comme un if/else en chaîne, mais plus propre).
  // Selon la catégorie sélectionnée, on retourne le composant formulaire
  // correspondant.
  //
  // Chaque <RepasForm />, <SiesteForm />, etc. est un composant React
  // défini dans son propre fichier (voir dossier components/EcranEnfant/)
  //
  // default: return null → si aucune catégorie n'est sélectionnée,
  // on n'affiche rien (mais normalement ce cas est géré avant d'appeler renderForm)
  const renderForm = () => {
    switch (selectedCategory) {
      case 'repas':
        return <RepasForm />;
      case 'sieste':
        return <SiesteForm />;
      case 'changes':
        return <ChangesForm />;
      case 'sante':
        return <SanteForm />;
      case 'activites':
        return <ActivitesForm />;
      case 'notes':
        return <NotesNounouForm />;
      default:
        return null;
    }
  };

  // ============================================================
  // COMPOSANT INTERNE : Checkbox (case à cocher)
  // ============================================================
  //
  // C'est un petit composant réutilisable défini DANS AcceuilEnfant
  // (on l'utilise pour Arrivée et Départ, pas besoin de le mettre
  // dans un fichier séparé car il n'est utilisé que ici)
  //
  // Props :
  // @param {boolean} value   - true = coché (carré rempli #B36444 + ✓)
  //                           false = pas coché (carré vide transparent)
  // @param {function} onToggle - fonction appelée quand on clique
  //
  // Visuellement :
  // - Pas coché : □ (carré vide avec bordure #B36444)
  // - Coché :     ☑ (carré rempli #B36444 avec un ✓ blanc)
  const Checkbox = ({ value, onToggle }) => (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        width: 22,                               // largeur du carré
        height: 22,                              // hauteur du carré
        borderRadius: 4,                         // coins légèrement arrondis
        borderWidth: 1.5,                        // épaisseur de la bordure
        borderColor: COLORS.primary,             // couleur de la bordure (#B36444)
        // Si coché → fond #B36444, sinon → fond transparent (on voit le fond de la page)
        backgroundColor: value ? COLORS.primary : 'transparent',
        alignItems: 'center',                    // centre le ✓ horizontalement
        justifyContent: 'center',                // centre le ✓ verticalement
      }}
    >
      {/* Affiche le ✓ SEULEMENT si la case est cochée */}
      {value && <Text style={{ color: COLORS.white, fontSize: 12 }}>✓</Text>}
    </TouchableOpacity>
  );

  // ============================================================
  // FONCTION : renderChildInfo — afficher la fiche info de l'enfant
  // ============================================================
  //
  // C'est ce qui s'affiche sous les boutons catégorie quand AUCUN
  // bouton n'est sélectionné. C'est la vue "par défaut".
  //
  // Elle contient :
  // 1. Le prénom de l'enfant (en gras)
  // 2. Ligne 1 : Age (input) + Arrivée (checkbox + heure)
  // 3. Ligne 2 : Poids (input) + Départ (checkbox + heure)
  // 4. Allergies (input)
  // 5. Contact : 2 boutons "Mère" et "Père"
  //
  // Les inputs sont des vrais TextInput, donc la nounou peut
  // modifier les valeurs (pour l'instant les changements ne sont
  // pas sauvegardés car le backend n'est pas connecté).
  const renderChildInfo = () => (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ borderWidth: 1, borderColor: COLORS.border }}
    >
      {/* ======== PRÉNOM DE L'ENFANT ======== */}
      {/* Affiché en gros et en gras tout en haut de la fiche */}
      <Text className="text-lg font-bold mb-3" style={{ color: COLORS.text }}>
        {enfant.prenom}
      </Text>

      {/* ======== LIGNE 1 : AGE + ARRIVÉE ======== */}
      {/* flex-row = les éléments sont côte à côte (horizontalement) */}
      {/* justify-between = Age à gauche, Arrivée à droite */}
      <View className="flex-row items-center justify-between mb-3">

        {/* --- Partie gauche : champ Age --- */}
        {/* flex-1 = prend tout l'espace disponible à gauche */}
        {/* mr-4 = marge à droite de 4 (espacement avec la checkbox) */}
        <View className="flex-1 mr-4">
          <Text className="text-sm mb-1" style={{ color: COLORS.text }}>Age</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,          // ligne sous le champ (style "underline")
              borderColor: COLORS.border,    // couleur de la ligne (#CCCCCC)
              color: COLORS.text,            // couleur du texte saisi (#000000)
              paddingVertical: 2,            // petit espace vertical
              fontSize: 14,                  // taille du texte
            }}
            value={age}                      // la valeur actuelle du champ
            onChangeText={setAge}            // met à jour "age" quand on tape
            placeholder="___"               // texte gris affiché quand le champ est vide
          />
        </View>

        {/* --- Partie droite : checkbox Arrivée + heure --- */}
        <View className="flex-row items-center">
          <Text className="text-sm mr-2" style={{ color: COLORS.text }}>Arrivée</Text>
          {/* La checkbox : quand on clique, toggleArrivee est appelé */}
          <Checkbox value={arrivee} onToggle={toggleArrivee} />
          {/* L'heure s'affiche SEULEMENT si la case est cochée */}
          {/* arrivee && (...) → "si arrivee est true, alors affiche ce qui suit" */}
          {arrivee && (
            <Text className="text-sm ml-2" style={{ color: COLORS.text, fontWeight: '600' }}>
              {arriveeHeure}
            </Text>
          )}
        </View>
      </View>

      {/* ======== LIGNE 2 : POIDS + DÉPART ======== */}
      {/* Même structure que la ligne Age/Arrivée */}
      <View className="flex-row items-center justify-between mb-3">

        {/* --- Partie gauche : champ Poids --- */}
        <View className="flex-1 mr-4">
          <Text className="text-sm mb-1" style={{ color: COLORS.text }}>Poids</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.border,
              color: COLORS.text,
              paddingVertical: 2,
              fontSize: 14,
            }}
            value={poids}
            onChangeText={setPoids}
            placeholder="___"
            keyboardType="numeric"    // affiche le clavier numérique (pas de lettres)
          />
        </View>

        {/* --- Partie droite : checkbox Départ + heure --- */}
        <View className="flex-row items-center">
          <Text className="text-sm mr-2" style={{ color: COLORS.text }}>Départ</Text>
          <Checkbox value={depart} onToggle={toggleDepart} />
          {depart && (
            <Text className="text-sm ml-2" style={{ color: COLORS.text, fontWeight: '600' }}>
              {departHeure}
            </Text>
          )}
        </View>
      </View>

      {/* ======== ALLERGIES ======== */}
      <View className="mb-3">
        <Text className="text-sm mb-1" style={{ color: COLORS.text }}>Allergies</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.border,
            color: COLORS.text,
            paddingVertical: 2,
            fontSize: 14,
          }}
          value={allergies}
          onChangeText={setAllergies}
          placeholder="___"
        />
      </View>

      {/* ======== SECTION CONTACT ======== */}
      <Text className="text-sm mb-3" style={{ color: COLORS.text }}>Contact</Text>

      {/* ======== BOUTONS MÈRE ET PÈRE ======== */}
      {/* flex-row = les 2 boutons sont côte à côte */}
      {/* gap-3 = espace de 3 entre les deux boutons */}
      <View className="flex-row gap-3">

        {/* --- Bouton MÈRE --- */}
        {/* flex-1 = prend la moitié de la largeur (les 2 boutons se partagent) */}
        {/* Quand on appuie, on ouvre le popup de contact avec les infos de la mère */}
        <TouchableOpacity
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: COLORS.primary }}
          onPress={() => setContactModal(parents.mere)}
        >
          <Text className="text-white font-semibold text-sm">Mère</Text>
          {/* Sous-texte : prénom et nom en blanc semi-transparent */}
          {/* rgba(255,255,255,0.7) = blanc à 70% d'opacité (un peu transparent) */}
          <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {parents.mere.prenom} · {parents.mere.nom}
          </Text>
        </TouchableOpacity>

        {/* --- Bouton PÈRE --- */}
        {/* Même structure que le bouton Mère */}
        <TouchableOpacity
          className="flex-1 rounded-xl py-3 items-center"
          style={{ backgroundColor: COLORS.primary }}
          onPress={() => setContactModal(parents.pere)}
        >
          <Text className="text-white font-semibold text-sm">Père</Text>
          <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {parents.pere.prenom} · {parents.pere.nom}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============================================================
  // RENDU JSX — Ce qui est affiché à l'écran
  // ============================================================
  return (
    // SafeAreaView = conteneur qui respecte l'encoche iPhone
    // flex-1 = prend tout l'espace disponible en hauteur
    // bg-white = fond blanc
    <SafeAreaView className="flex-1 bg-white">

      {/* ScrollView = zone scrollable pour pouvoir défiler si le contenu est long */}
      {/* px-4 = padding horizontal de 4 (espacement des bords gauche/droit) */}
      {/* showsVerticalScrollIndicator={false} = cache la barre de défilement */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

        {/* ============================================================ */}
        {/* HEADER : FLÈCHE RETOUR (←)                                  */}
        {/* ============================================================ */}
        {/* py-4 = padding vertical (espacement en haut et en bas) */}
        <View className="flex-row items-center py-4">
          <TouchableOpacity onPress={handleBack} className="p-1">
            {/* ArrowLeft = icône de flèche ← de lucide-react-native */}
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* TITRE : PRÉNOM ET ÂGE DE L'ENFANT                           */}
        {/* ============================================================ */}
        {/* Affiché en gros au centre, ex: "Léa, 3 ans"                 */}
        {/*                                                              */}
        {/* enfant.age ? `, ${enfant.age}` : ''                          */}
        {/* ↑ Si l'enfant a un âge → on affiche ", 3 ans"               */}
        {/*   Sinon → on affiche rien (juste le prénom)                  */}
        {/* ============================================================ */}
        <Text
          className="text-xl font-bold text-center mb-4"
          style={{ color: COLORS.text }}
        >
          {enfant.prenom}{enfant.age ? `, ${enfant.age}` : ''}
        </Text>

        {/* ============================================================ */}
        {/* BOUTONS CATÉGORIE — LIGNE 1 (Repas, Sieste, Changes)        */}
        {/* ============================================================ */}
        {/*                                                              */}
        {/* categories.slice(0, 3) → prend les 3 premiers éléments      */}
        {/* du tableau categories (index 0, 1, 2)                        */}
        {/*                                                              */}
        {/* .map() → boucle sur chaque élément pour créer un bouton     */}
        {/*                                                              */}
        {/* isSelected → true si ce bouton est le bouton actuellement    */}
        {/* sélectionné, false sinon                                     */}
        {/*                                                              */}
        {/* STYLE DU BOUTON :                                            */}
        {/* - Normal (pas sélectionné) : fond #B36444, texte blanc      */}
        {/* - Sélectionné : fond blanc, bordure #B36444, texte #B36444  */}
        {/* - Les 2 ont une petite ombre (shadow sur iOS, elevation     */}
        {/*   sur Android) pour l'effet de profondeur                    */}
        {/* ============================================================ */}
        <View className="flex-row gap-3 mb-3">
          {categories.slice(0, 3).map((cat) => {
            // Est-ce que CE bouton est celui qui est actuellement sélectionné ?
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}  // key = identifiant unique pour React (obligatoire dans un .map)
                onPress={() => handleCategoryPress(cat.id)}
                className="flex-1 rounded-2xl items-center justify-center"
                style={{
                  // Couleur de fond : blanc si sélectionné, #B36444 sinon
                  backgroundColor: isSelected ? COLORS.white : COLORS.primary,
                  paddingVertical: 14,   // espace intérieur haut/bas
                  minHeight: 56,         // hauteur minimale pour uniformiser les boutons
                  // Si sélectionné → on ajoute une bordure pour montrer la sélection
                  ...(isSelected
                    ? { borderWidth: 1.5, borderColor: COLORS.primary }
                    : {}),
                  // Ombre du bouton — différente sur iOS et Android
                  // iOS utilise shadow*, Android utilise elevation
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',                    // couleur de l'ombre (noir)
                      shadowOffset: { width: 0, height: 2 }, // décalage vers le bas
                      shadowOpacity: 0.15,                    // 15% d'opacité (subtile)
                      shadowRadius: 4,                        // flou de l'ombre
                    },
                    android: { elevation: 3 },  // équivalent Android de l'ombre
                  }),
                }}
              >
                {/* Texte du bouton */}
                <Text
                  className="text-center font-bold text-sm"
                  style={{
                    // Couleur du texte : #B36444 si sélectionné, blanc sinon
                    color: isSelected ? COLORS.primary : COLORS.white,
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ============================================================ */}
        {/* BOUTONS CATÉGORIE — LIGNE 2 (Santé, Activités, Notes Nounou) */}
        {/* ============================================================ */}
        {/* Même principe que la ligne 1, mais avec categories.slice(3, 6) */}
        {/* → prend les éléments d'index 3, 4, 5                         */}
        <View className="flex-row gap-3 mb-4">
          {categories.slice(3, 6).map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                className="flex-1 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: isSelected ? COLORS.white : COLORS.primary,
                  paddingVertical: 14,
                  minHeight: 56,
                  ...(isSelected
                    ? { borderWidth: 1.5, borderColor: COLORS.primary }
                    : {}),
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15,
                      shadowRadius: 4,
                    },
                    android: { elevation: 3 },
                  }),
                }}
              >
                <Text
                  className="text-center font-bold text-sm"
                  style={{
                    color: isSelected ? COLORS.primary : COLORS.white,
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ============================================================ */}
        {/* CONTENU PRINCIPAL                                            */}
        {/* ============================================================ */}
        {/* selectedCategory ? renderForm() : renderChildInfo()          */}
        {/*                                                              */}
        {/* C'est un opérateur ternaire :                                 */}
        {/* "Si une catégorie est sélectionnée, affiche le formulaire    */}
        {/*  correspondant. Sinon, affiche la fiche info de l'enfant."   */}
        {/* ============================================================ */}
        {selectedCategory ? renderForm() : renderChildInfo()}

      </ScrollView>

      {/* ============================================================ */}
      {/* MODAL DE CONTACT (popup téléphone)                           */}
      {/* ============================================================ */}
      {/*                                                              */}
      {/* Ce popup s'affiche quand la nounou clique sur "Mère" ou "Père" */}
      {/* Il montre :                                                    */}
      {/*   - Le label (Mère / Père)                                    */}
      {/*   - Le prénom et nom du parent                                 */}
      {/*   - Le numéro de téléphone en gros                            */}
      {/*   - Un bouton "Appeler" avec icône téléphone                  */}
      {/*                                                              */}
      {/* visible={contactModal !== null}                                */}
      {/* → Le popup est visible SEULEMENT si contactModal n'est pas null */}
      {/*   (= on a cliqué sur un bouton parent)                        */}
      {/*                                                              */}
      {/* transparent = le fond derrière le popup est visible           */}
      {/* animationType="fade" = le popup apparaît avec un fondu       */}
      {/* onRequestClose = quand on appuie sur le bouton retour Android */}
      {/* ============================================================ */}
      <Modal
        visible={contactModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setContactModal(null)}
      >
        {/* --- FOND SEMI-TRANSPARENT (overlay sombre) --- */}
        {/* Quand on clique sur le fond sombre → ça ferme le popup */}
        {/* activeOpacity={1} = pas d'effet de transparence au clic */}
        {/* rgba(0,0,0,0.4) = noir à 40% d'opacité = fond gris semi-transparent */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setContactModal(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',  // centre le popup verticalement
            alignItems: 'center',      // centre le popup horizontalement
          }}
        >
          {/* --- BOÎTE BLANCHE DU POPUP --- */}
          {/* activeOpacity={1} = empêche que le clic sur la boîte */}
          {/* blanche ne la ferme (sinon le clic "traverse" vers le fond) */}
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,       // coins bien arrondis
              padding: 24,            // espace intérieur
              width: '80%',           // 80% de la largeur de l'écran
              alignItems: 'center',   // centre le contenu horizontalement
            }}
          >
            {/* --- BOUTON FERMER (croix ✕ en haut à droite) --- */}
            <TouchableOpacity
              onPress={() => setContactModal(null)}
              style={{ position: 'absolute', top: 12, right: 12 }}
            >
              {/* X = icône croix de lucide-react-native */}
              <X size={20} color={COLORS.text} />
            </TouchableOpacity>

            {/* --- TITRE DU POPUP (ex: "Mère") --- */}
            <Text
              className="text-lg font-bold mb-1"
              style={{ color: COLORS.text }}
            >
              {/* contactModal?.label → affiche "Mère" ou "Père" */}
              {/* Le ?. (optional chaining) évite un crash si contactModal est null */}
              {contactModal?.label}
            </Text>

            {/* --- PRÉNOM ET NOM DU PARENT --- */}
            <Text className="text-sm mb-4" style={{ color: COLORS.text }}>
              {contactModal?.prenom} {contactModal?.nom}
            </Text>

            {/* --- NUMÉRO DE TÉLÉPHONE (en gros) --- */}
            <Text
              className="text-xl font-semibold mb-5"
              style={{ color: COLORS.text }}
            >
              {contactModal?.telephone}
            </Text>

            {/* --- BOUTON APPELER --- */}
            {/* Quand on appuie, ça ouvre l'app téléphone du smartphone */}
            {/* avec le numéro pré-rempli grâce à handleCall */}
            <TouchableOpacity
              className="flex-row items-center rounded-full px-8 py-3"
              style={{ backgroundColor: COLORS.primary }}
              onPress={() => {
                if (contactModal?.telephone) {
                  handleCall(contactModal.telephone);
                }
              }}
            >
              {/* Icône de téléphone 📞 */}
              <Phone size={18} color={COLORS.white} />
              {/* Texte "Appeler" à côté de l'icône */}
              <Text
                className="text-white font-bold text-base ml-2"
              >
                Appeler
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
