const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le JSON et les fichiers statiques
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Base de données dynamique intégrale (97 plats corrigés et vérifiés)
const menuDatabase = [
    // Voorgerechten
    { id: 1, category: "voorgerechten", name: "Pane e Burro", desc: "Pain italien frais avec beurre à l'ail", price: 7.50 },
    { id: 2, category: "voorgerechten", name: "Pain italien avec fromage", desc: "Pain italien cuit au four et nappé de fromage fondu", price: 7.50 },
    { id: 3, category: "voorgerechten", name: "Salade de thon", desc: "Salade fraîche accompagnée de thon et condiments", price: 9.00 },
    { id: 4, category: "voorgerechten", name: "Pane e Pesto", desc: "Pain italien avec pesto, tomates cerises, mozzarella et basilicum", price: 9.50 },
    { id: 5, category: "voorgerechten", name: "Bruschette al Pomodoro", desc: "Morceaux de pain croustillants avec tomate, oignon, sauce basilic et olives", price: 9.50 },
    { id: 6, category: "voorgerechten", name: "Funghi al Burro", desc: "Champignons sautés, sauce crème et pain", price: 10.00 },
    { id: 7, category: "voorgerechten", name: "Carpaccio", desc: "Fines tranches de filet de bœuf mariné", price: 13.00 },
    
    // Klassieke Pizza's
    { id: 8, category: "klassieke-pizzas", name: "Pizza Margherita", desc: "Tomates et fromage", price: 10.00 },
    { id: 9, category: "klassieke-pizzas", name: "Pizza Funghi", desc: "Tomates, fromage et champignons", price: 11.00 },
    { id: 10, category: "klassieke-pizzas", name: "Pizza Jambon", desc: "Tomates, fromage et jambon", price: 11.50 },
    { id: 11, category: "klassieke-pizzas", name: "Pizza Salami", desc: "Tomates, fromage et salami", price: 11.50 },
    { id: 12, category: "klassieke-pizzas", name: "Pizza Hawaïenne", desc: "Tomates, fromage, jambon et ananas", price: 12.00 },
    { id: 13, category: "klassieke-pizzas", name: "Pizza Peperone", desc: "Tomates, fromage, champignons, poivrons, oignons, piments et salami", price: 15.50 },
    { id: 14, category: "klassieke-pizzas", name: "Pizza Vesuvio", desc: "Tomates, fromage, champignons et salami", price: 12.50 },
    { id: 15, category: "klassieke-pizzas", name: "Pizza Mozzarella", desc: "Tomates, fromage, tomate fraîche, mozzarella et basilic", price: 15.50 },
    { id: 16, category: "klassieke-pizzas", name: "Pizza Quattro Formaggi", desc: "Tomates, fromage, gorgonzola, mozzarella et parmesan", price: 14.50 },
    { id: 17, category: "klassieke-pizzas", name: "Pizza Quattro Stagioni", desc: "Tomates, fromage, jambon, salami, champignons, poivron et oignon", price: 15.00 },

    // Populaire Pizza's
    { id: 18, category: "populaire-pizzas", name: "Pizza Carbonara", desc: "Tomates, fromage, jambon, salami, bacon et oignon", price: 13.50 },
    { id: 19, category: "populaire-pizzas", name: "Pizza Carbonara Speciale", desc: "Tomates, fromage, jambon, salami, bacon, œuf au plat et oignon", price: 14.50 },
    { id: 20, category: "populaire-pizzas", name: "Pizza Al Bolognese", desc: "Tomates, fromage, sauce bolognaise et parmesan", price: 13.00 },
    { id: 21, category: "populaire-pizzas", name: "Pizza al Spinaci", desc: "Tomates, fromage, épinards et oignon", price: 13.00 },
    { id: 22, category: "populaire-pizzas", name: "Pizza Poulet Brocoli", desc: "Tomates, fromage, brocoli, oignon et poulet", price: 16.00 },
    { id: 23, category: "populaire-pizzas", name: "Pizza Vegetariana", desc: "Tomates, fromage, champignons, artichauts, tomates séchées, poivron, oignon, asperges, olives et ail frais", price: 14.50 },
    { id: 24, category: "populaire-pizzas", name: "Pizza al Gorgonzola", desc: "Tomates, fromage, gorgonzola et ail frais", price: 15.00 },
    { id: 25, category: "populaire-pizzas", name: "Pizza Shawarma", desc: "Tomates, fromage et shawarma", price: 15.00 },
    { id: 26, category: "populaire-pizzas", name: "Pizza Shawarma Special", desc: "Tomates, fromage, shawarma, poivron, oignon et champignons", price: 15.00 },
    { id: 27, category: "populaire-pizzas", name: "Pizza Émincé de Poulet", desc: "Tomates, fromage et morceaux de filet de poulet", price: 15.00 },
    { id: 28, category: "populaire-pizzas", name: "Pizza Kebab (Poulet ou Veau)", desc: "Tomates, fromage, kebab de poulet ou de veau grillé", price: 15.00 },
    { id: 29, category: "populaire-pizzas", name: "Pizza Kapsalon", desc: "Tomates, fromage, frites et salade", price: 15.00 },
    { id: 30, category: "populaire-pizzas", name: "Pizza Gyros", desc: "Tomates, fromage, gyros, oignons et ail frais", price: 15.00 },
    { id: 31, category: "populaire-pizzas", name: "Pizza Kipsete", desc: "Tomates, fromage et saté de poulet", price: 15.00 },
    { id: 32, category: "populaire-pizzas", name: "Pizza Pizzaiolo", desc: "Tomates, fromage, champignons, rucola, sauce parmesan et ail frais", price: 14.00 },
    { id: 33, category: "populaire-pizzas", name: "Pizza Filethaas", desc: "Tomates, fromage, morceaux de filet de porc, sauce parmesan et ail", price: 16.00 },
    { id: 34, category: "populaire-pizzas", name: "Pizza Varkenshaas (Spécialité)", desc: "Tomates, fromage, filet de porc, champignons et sauce crème", price: 14.00 },

    // Onze Specials
    { id: 35, category: "specials", name: "Pizza au filet de bœuf", desc: "Tomates, fromage, filet de bœuf, oignon rouge, poivron, tomate et parmesan", price: 16.00 },
    { id: 36, category: "specials", name: "Pizza Carpaccio", desc: "Tomates, fromage, fines tranches de filet de bœuf, rucola et parmesan", price: 16.50 },
    { id: 37, category: "specials", name: "Pizza Napolitano", desc: "Tomates, fromage, salami, jambon, poivron, oignon, mozzarella et champignons", price: 15.00 },
    { id: 38, category: "specials", name: "Pizza Paesana Speciaal", desc: "Tomates, fromage, champignons, jambon, salami, bacon, oignon et mozzarella", price: 14.50 },
    { id: 39, category: "specials", name: "Pizza Dinamite", desc: "Tomates, fromage, salami, bacon, oignon, poivron, mozzarella et piments", price: 14.50 },
    { id: 40, category: "specials", name: "Pizza Oma", desc: "Tomates, fromage, anchois, thon, poivron, oignon et champignons", price: 16.00 },
    { id: 41, category: "specials", name: "Pizza Freek", desc: "Tomates, fromage, shawarma, kebab de poulet et kebab de veau", price: 16.00 },
    { id: 42, category: "specials", name: "Pizza Sucuk", desc: "Tomates, fromage et saucisse turque épicée", price: 13.00 },
    { id: 43, category: "specials", name: "Fantasie van de klant", desc: "Composez vous-même votre pizza avec vos ingrédients préférés", price: 16.00 },

    // Vis Pizza's
    { id: 44, category: "vis-pizzas", name: "Pizza Frutti di Mare", desc: "Tomates, fromage et assortiment de fruits de mer", price: 15.50 },
    { id: 45, category: "vis-pizzas", name: "Pizza au saumon", desc: "Tomates, fromage et morceaux de saumon tendre", price: 15.00 },
    { id: 46, category: "vis-pizzas", name: "Pizza Marinara", desc: "Tomates, fromage, oignon, thon, anchois et saumon", price: 13.00 },
    { id: 47, category: "vis-pizzas", name: "Pizza au thon", desc: "Tomates, fromage, oignon et thon", price: 13.00 },

    // Pasta's
    { id: 48, category: "pastas", name: "Pâtes Aglio Olio", desc: "Avec (beaucoup d') ail, poivrons, piments, persil et huile d'olive", price: 11.50 },
    { id: 49, category: "pastas", name: "Pâtes Bolognese", desc: "Avec de la viande de bœuf hachée assaisonnée et sauce tomate", price: 13.00 },
    { id: 50, category: "pastas", name: "Pâtes Carbonara", desc: "Avec du bacon, du parmesan, des oignons et une sauce à la crème", price: 13.00 },
    { id: 51, category: "pastas", name: "Pâtes Vegetariana", desc: "Avec divers légumes frais, sauce tomate piquante et parmesan", price: 13.50 },
    { id: 52, category: "pastas", name: "Pâtes Quattro Formaggi", desc: "Avec quatre types de fromages fondus et sauce crème", price: 13.50 },
    { id: 53, category: "pastas", name: "Pâtes Marinara", desc: "Avec moules, crevettes, calamar et sauce tomate savoureuse", price: 15.50 },
    { id: 54, category: "pastas", name: "Pâtes Spinaci", desc: "Aux épinards frais, bacon, fromage et sauce à la crème", price: 13.50 },
    { id: 55, category: "pastas", name: "Pâtes Pollo", desc: "Avec morceaux de filet de poulet, légumes variés, pesto et crème", price: 16.00 },
    { id: 56, category: "pastas", name: "Pâtes Carbonara Speciale", desc: "Sauce tomate, fromage, bacon, jambon, salami, œuf au plat et oignon", price: 15.00 },
    { id: 57, category: "pastas", name: "Pâtes Poulet et Brocoli", desc: "Sauce tomate, filet de poulet, brocoli et parmesan râpé", price: 15.00 },

    // Kapsalons
    { id: 58, category: "kapsalon", name: "Kapsalon (Veau, Poulet Doner ou Shawarma)", desc: "Avec frites, viande au choix, fromage et salade", price: 11.50 },
    { id: 59, category: "kapsalon", name: "Rotterdam Kapsalon", desc: "La recette authentique et généreuse style Rotterdam", price: 12.50 },
    { id: 60, category: "kapsalon", name: "Kapsalon Mix Groot", desc: "Grand plateau avec un mélange de plusieurs viandes grillées", price: 15.00 },
    { id: 61, category: "kapsalon", name: "Kapsalon Spareribs", desc: "Frites, viande de spareribs désossée et fondante, fromage et salade", price: 18.00 },
    { id: 62, category: "kapsalon", name: "Kapsalon Rotterdam Groot", desc: "Format géant du Kapsalon Rotterdam", price: 16.00 },
    { id: 63, category: "kapsalon", name: "Kapsalon Kipfilet", desc: "Avec des morceaux de filet de poulet marinés et grillés", price: 13.50 },
    { id: 64, category: "kapsalon", name: "Kapsalon Frikandel", desc: "Variante originale de kapsalon accompagnée de morceaux de frikandel", price: 11.50 },
    { id: 65, category: "kapsalon", name: "Kapsalon Crispy", desc: "Composé de tenders de poulet extra croustillants", price: 15.50 },

    // Broodjes & Lahmacun
    { id: 66, category: "sandwiches", name: "Sandwich (Veau, Poulet Döner ou Shawarma)", desc: "Pain pita ou sandwich garni avec la viande de votre choix", price: 9.50 },
    { id: 67, category: "sandwiches", name: "Tosti Turc", desc: "Pain croustillant pressé avec du fromage et de la saucisse turque sucuk", price: 10.00 },
    { id: 68, category: "sandwiches", name: "Dürüm (Döner, Poulet Döner ou Falafel)", desc: "Galette roulée garnie avec viande ou falafels végétariens", price: 9.50 },
    { id: 69, category: "sandwiches", name: "Lahmacun (Shawarma, Poulet ou Döner de Veau)", desc: "Pizza turque fine enroulée autour d'une viande au choix", price: 12.00 },

    // Schotels
    { id: 70, category: "schotels", name: "Assiette de travers de porc (veau, sucrés ou au miel)", desc: "Côtes levées tendres avec accompagnements au choix", price: 24.00 },
    { id: 71, category: "schotels", name: "Assiette Shawarma, Veau ou Poulet Döner", desc: "Servie généreusement avec frites, salade fraîche et sauces", price: 15.00 },
    { id: 72, category: "schotels", name: "Assiette Shawarma Spécial (Veau ou Poulet)", desc: "Garnie de poivrons, oignons et champignons sautés", price: 15.00 },
    { id: 73, category: "schotels", name: "Assiette Shawarma Hawaï", desc: "Accompagnée de morceaux d'ananas juteux et fromage fondu", price: 15.00 },
    { id: 74, category: "schotels", name: "Assiette Shawarma Mariné Spécial", desc: "Viande de shawarma avec une marinade maison renforcée", price: 17.00 },
    { id: 75, category: "schotels", name: "Assiette Lahmacun", desc: "Assiette complète de pizza turque avec viande (veau, poulet ou shawarma)", price: 15.00 },
    { id: 76, category: "schotels", name: "Assiette Döner Hawaï", desc: "Döner classique sur assiette avec ananas et fromage", price: 16.00 },
    { id: 77, category: "schotels", name: "Assiette Poulet Döner Hawaï", desc: "Döner de poulet combiné avec éclats d'ananas", price: 16.00 },
    { id: 78, category: "schotels", name: "Assiette Escalope de Poulet", desc: "Morceaux de filet de poulet grillés à la plaque", price: 18.50 },
    { id: 79, category: "schotels", name: "Assiette Poulet Spécial", desc: "Filet de poulet sauté aux champignons, poivrons et oignons", price: 18.50 },
    { id: 80, category: "schotels", name: "Assiette Poulet Sauce Crème", desc: "Poulet tendre nappé d'une onctueuse sauce crème maison", price: 18.50 },
    { id: 81, category: "schotels", name: "Assiette Poulet Mariné Spécial", desc: "Blancs de poulet longuement marinés dans des épices fines", price: 17.00 },
    { id: 82, category: "schotels", name: "Assiette Brochettes Saté Poulet", desc: "Brochettes de poulet nappées de sauce cacahuète saté", price: 15.50 },
    { id: 83, category: "schotels", name: "Assiette Steak de Hamburger Grillé", desc: "Steaks de bœuf hachés saisis au gril", price: 12.50 },
    { id: 84, category: "schotels", name: "Assiette Kofta Spécial", desc: "Boulettes de viande hachée hautement assaisonnées selon la tradition", price: 15.50 },
    { id: 85, category: "schotels", name: "Assiette Filet de Bœuf Sauce Crème", desc: "Filet de bœuf de qualité supérieure, sauce crémeuse", price: 27.00 },
    { id: 86, category: "schotels", name: "Assiette Filet de Porc Sauce Crème", desc: "Filet de porc tendre aux champignons et crème", price: 22.50 },
    { id: 87, category: "schotels", name: "Assiette Steak Biefstuk", desc: "Pièce de bœuf classique cuite selon vos goûts", price: 22.00 },
    { id: 88, category: "schotels", name: "Assiette Saumon Sauce Crème", desc: "Pavé de saumon rôti servi avec une sauce veloutée", price: 22.00 },
    { id: 89, category: "schotels", name: "Assiette Adana Kebab", desc: "Brochette de viande hachée de bœuf et d'agneau pimentée", price: 28.00 },
    { id: 90, category: "schotels", name: "Assiette Spareribs de Veau", desc: "Portion généreuse de travers de veau grillés au feu de bois", price: 27.00 },
    { id: 91, category: "schotels", name: "Assiette Shawarma d'Agneau", desc: "Émincé de viande d'agneau tendre et savoureuse", price: 16.00 },

    // Mixed Grill & Kip
    { id: 92, category: "mixed-grill", name: "Grillades mixtes (1 personne)", desc: "Assortiment de différents types de viandes grillées", price: 20.00 },
    { id: 93, category: "mixed-grill", name: "Mixed Grill (2 personnes)", desc: "Grand plateau de fête avec un assortiment complet de viandes grillées", price: 25.00 },
    { id: 94, category: "mixed-grill", name: "Demi-poulet et frites", desc: "Demi-poulet rôti à la peau croustillante avec frites", price: 12.00 },
    { id: 95, category: "mixed-grill", name: "Aiguillettes de poulet et frites", desc: "Tenders de poulet panés croustillants et frites", price: 15.00 },
    { id: 96, category: "mixed-grill", name: "Burger de poulet et frites", desc: "Sandwich burger au poulet croustillant et frites", price: 10.00 },
    { id: 97, category: "mixed-grill", name: "Hot wings et frites", desc: "Ailes de poulet épicées et frites goudgele", price: 10.00 }
];

// Route API : Récupérer le menu dynamique
app.get('/api/menu', (req, res) => {
    res.json(menuDatabase);
});

// Route API : Traiter la commande reçue
app.post('/api/order', (req, res) => {
    const { customer, cart, total } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ success: false, message: "Het winkelmandje is leeg." });
    }
    console.log(`\n🚨 [NIEUWE BESTELLING VERWERKT] 🚨`);
    console.log(`Klant: ${customer.name} (${customer.phone})`);
    console.log(`Adres: ${customer.address || "Afhalen in restaurant"}`);
    console.log(`Items:`, cart.map(i => `${i.quantity}x ${i.name}`).join(', '));
    console.log(`Totaal te betalen: € ${total.toFixed(2)}\n`);

    res.json({ 
        success: true, 
        message: "Uw bestelling is succesvol ontvangen door de keuken van Napoli!",
        orderId: Math.floor(100000 + Math.random() * 900000)
    });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Applicatie live op: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});