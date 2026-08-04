const projects = [
  {
    id: 'oracle-loyers',
    number: '01',
    name: 'ORACLE_LOYERS',
    tags: ['React', 'Leaflet', 'Web Scraping', 'Chatbot IA', 'XGBoost'],
    status: 'DEPLOYÉ',
    title: 'Oracle des Loyers',
    description:
      "Récupération et affichage sur map React d'annonces immobilières & établissements commerciaux / publics avec intégration chatbot cynique pour comparer les prix entre les quartiers de Lyon.",
    image: 'images/view_website_oracle.png',
    link: { label: 'Voir le dépôt Github', url: 'https://github.com/halekss/oracle_loyers.git' },
  },
  {
    id: 'abonneo',
    number: '02',
    name: 'ABONNEO',
    tags: ['PostgreSQL', 'FastAPI', 'Next.js'],
    status: 'DEPLOYÉ',
    title: 'Abonneo',
    description:
      "Suivi des pages tarifiares d'abonnement à des plateformes de services commerciaux, avec détection des hausses de prix/changements de conditions, et transformation en recommandation explicable.",
    image: 'images/log_abonneo.png',
    link: { label: 'Voir le dépôt Github', url: 'https://github.com/VRuddy/abonneo.git' },
  },
  {
    id: 'api-pipeline-viz',
    number: '03',
    name: 'API_PIPELINE_VIZ',
    tags: ['OAuth', 'Github Actions', 'HTML/CSS'],
    status: 'DEPLOYÉ',
    title: 'Pipeline et Viz de données API',
    description:
      "Projet Data end-to-end : collecte automatisée de données via une API REST authentifiée, traitement et structuration en CSV, puis restitution dans un dashboard web interactif mis à jour quotidiennement.",
    image: 'images/main_screen_dashboard_wow.png',
    link: { label: 'Voir le dashboard', url: 'https://halekss.github.io/data_classification_API_blizzard/' },
  },
  {
    id: 'scraper-discord',
    number: '04',
    name: 'SCRAPER_DISCORD',
    tags: ['Playwright', 'Asyncio', 'Github Actions', 'Webhook Discord'],
    status: 'DEPLOYÉ',
    title: 'Scraper automate avec alerte Discord',
    description:
      'Un script Python automatisé et asynchrone pour suivre les meilleurs builds de talents "Gouffres" (Delves) pour toutes les spécialisations de World of Warcraft depuis Wowhead, avec notifications Discord en temps réel.',
    image: 'images/logo_wowhead.png',
    link: { label: 'Voir le Github', url: 'https://github.com/halekss/webhook_discord_wowhead.git' },
  },
  {
    id: 'movie-recommender',
    number: '05',
    name: 'MOVIE_RECOMMENDER',
    tags: ['Streamlit', 'Machine Learning'],
    status: 'DEPLOYÉ',
    title: 'Modèle de recommandation de films',
    description:
      "Exploration et nettoyage d'un jeu de données pour entrainement d'un modèle de Machine Learning, utilisable directement sur une application Streamlit.",
    image: 'images/senechal_movie.png',
    link: { label: 'Voir le site', url: 'https://senechalmovieapp-cvl6oryohmkmr7rzmgngg9.streamlit.app/' },
  },
  {
    id: 'kpi-toys-models',
    number: '06',
    name: 'KPI_TOYS_MODELS',
    tags: ['Power BI', 'SQL'],
    status: 'DEPLOYÉ',
    title: 'Dashboard KPI Financiers : Toys & Models',
    description:
      "Création de requêtes SQL complexes pour extraire les indicateurs clés et visualisation interactive sur Power BI.",
    image: 'images/pict_toys_and_models.png',
    link: { label: 'Voir le Dashboard', url: 'toys_and_models.pdf' },
  },
]

export default projects
