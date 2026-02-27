const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Users/Gaétan/Documents/Site/Exégèse/js/data/matthieu.js');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace('export const matthieu = ', '');
const matthieu = eval('(' + content + ')');

const newExegeses = {
    1: [
        {
            verseRange: [18, 25],
            author: "Saint Thomas d'Aquin",
            source: "Catena Aurea",
            text: "L'Ancien Testament nous a été donné pour nous préparer à recevoir la splendeur du Nouveau. La généalogie montre que Jésus s'inscrit pleinement dans l'histoire, mais sa conception virginale manifeste qu'Il la transcende souverainement par la grâce de l'Esprit."
        }
    ],
    2: [
        {
            verseRange: [1, 12],
            author: "Saint Léon le Grand",
            source: "Sermons pour l'Épiphanie",
            text: "La visite des mages inaugure le salut des nations. Ce que l'étoile a montré extérieurement s'accomplit intérieurement par la lumière de la grâce qui mène les cœurs païens à adorer le véritable Roi des rois."
        }
    ],
    3: [
        {
            verseRange: [13, 17],
            author: "Saint Hilaire de Poitiers",
            source: "Commentaire sur l'Évangile de Matthieu",
            text: "Ce n'est pas le Christ qui est sanctifié par les eaux du Jourdain, ce sont les eaux qui sont sanctifiées par le Christ, préfigurant ainsi le sacrement du Baptême où l'Esprit Saint descend sur les futurs fils d'adoption."
        }
    ],
    4: [
        {
            verseRange: [1, 11],
            author: "Saint Augustin",
            source: "Commentaires sur les Psaumes",
            text: "Le Christ a voulu être tenté pour nous enseigner comment vaincre le tentateur. En lui, c'est notre nature fragile qui était tentée; par sa fermeté et son recours constant à l'Écriture, Il nous donne l'arme infaillible de la Parole de Dieu."
        }
    ],
    5: [
        {
            verseRange: [3, 10],
            author: "Saint Grégoire de Nysse",
            source: "Sur les Béatitudes",
            text: "Les béatitudes sont comme une échelle dont chaque échelon nous élève de la vie mondaine vers la pure nature spirituelle. L'homme qui se purifie n'aperçoit plus l'image de Dieu hors de lui, mais dans la limpidité de son propre cœur réparé par la grâce."
        }
    ],
    6: [
        {
            verseRange: [9, 13],
            author: "Saint Cyprien de Carthage",
            source: "L'Oraison Dominicale",
            text: "Quelle prière pourrait être plus vraie devant Dieu que celle dictée par le Fils qui est la Vérité ? Demander de recevoir le nom du Père et de faire sa volonté résume toute la voie d'obéissance qui guérit la désobéissance d'Adam."
        }
    ],
    7: [
        {
            verseRange: [24, 27],
            author: "Saint Jean Chrysostome",
            source: "Homélies sur l'Évangile de Matthieu",
            text: "Bâtir sur le roc, ce n'est pas se contenter de l'audition de la Parole. La maison des vertus ne résiste aux tempêtes des passions et aux persécutions terrestres que si la pratique s'unit à l'enseignement du Christ."
        }
    ],
    8: [
        {
            verseRange: [23, 27],
            author: "Saint Bède le Vénérable",
            source: "Homélies sur les Évangiles",
            text: "Le sommeil du Christ n'est pas faiblesse, mais pédagogie. Il dort pour éprouver la foi de ses disciples et leur permettre de reconnaître que sans Lui, la barque de l'Église – et toute âme humaine – coulerait sous les flots de l'orgueil."
        }
    ],
    9: [
        {
            verseRange: [9, 13],
            author: "Saint Jérôme",
            source: "Commentaire sur l'Évangile de Matthieu",
            text: "En regardant Matthieu au péage, Jésus n'a pas seulement vu un publicain, Il l'a élu par miséricorde. Le Seigneur nous enseigne ainsi que nulle déchéance n'arrête la médecine divine : le médecin divin visite les foyers les plus infectés pour y ramener la santé."
        }
    ],
    10: [
        {
            verseRange: [16, 20],
            author: "Saint Cyprien de Carthage",
            source: "Lettres",
            text: "Le Christ ne nous a pas promis des chemins de roses, mais l'affrontement aux loups. Pourtant, il nous munit d'une assurance invincible : ce n'est plus l'homme faible qui parle au tribunal, c'est l'Esprit du Père lui-même qui confesse la foi à travers le martyr."
        }
    ],
    11: [
        {
            verseRange: [25, 30],
            author: "Saint Bernard de Clairvaux",
            source: "Sermons sur le Cantique des Cantiques",
            text: "L'enseignement divin est fermé aux sages remplis de leur propre enflure, mais se déploie devant l'âme humble. Porter le joug du Christ n'ajoute ni fardeau ni chaîne, mais donne des ailes de lumière pour s'envoler vers Dieu."
        }
    ],
    12: [
        {
            verseRange: [38, 42],
            author: "Saint Irénée de Lyon",
            source: "Contre les Hérésies",
            text: "Le signe de Jonas n'est pas seulement le symbole de la résurrection du Seigneur après trois jours, c'est aussi la preuve que le Christ abolit l'empire de la mort et régénère l'homme en le délivrant des profondeurs infernales."
        }
    ],
    13: [
        {
            verseRange: [36, 43],
            author: "Saint Thomas d'Aquin",
            source: "Catena Aurea",
            text: "Dieu permet le mélange du bon grain et de l'ivraie – de l'Église terrestre composée de justes et de pécheurs – tant pour ménager au méchant la possibilité de la pénitence que pour forger la couronne de patience accordée au juste."
        }
    ],
    14: [
        {
            verseRange: [13, 21],
            author: "Saint Augustin",
            source: "Commentaires sur l'Évangile de Jean",
            text: "Celui qui par nature multiplie chaque année les moissons à partir de quelques grains enfouis dans le sol, a accompli soudainement par ses mains ce même mystère. Cette faim matérielle guérie annonce l'Eucharistie qui rassasie l'âme affamée de vie."
        }
    ],
    15: [
        {
            verseRange: [21, 28],
            author: "Saint Jean Chrysostome",
            source: "Homélies",
            text: "La sévérité apparente du Christ face à la Cananéenne était pour manifester au grand jour son immense foi. Souvent, Dieu diffère son exaucement non pour nous éconduire, mais pour attiser la persévérance et nous accorder un bien spirituel accru."
        }
    ],
    16: [
        {
            verseRange: [13, 19],
            author: "Saint Léon le Grand",
            source: "Sermons sur la Chaire de Saint Pierre",
            text: "La solidité de Pierre repose sur la fermeté de sa confession, elle-même inspirée par le Père. C'est sur ce roc inébranlable de la vraie foi christologique que l'Église est fermement édifiée, échappant ainsi aux flots du doute et de l'erreur."
        }
    ],
    17: [
        {
            verseRange: [1, 9],
            author: "Bède le Vénérable",
            source: "Commentaire sur l'Évangile de Marc",
            text: "La clarté éblouissante de la Transfiguration vient raviver la foi des Apôtres avant le scandale de la Croix. Ainsi notre propre espérance est soutenue dans les souffrances : la gloire pressentie nous soutient au cœur de nos vallées de larmes."
        }
    ],
    18: [
        {
            verseRange: [21, 35],
            author: "Saint Jean Chrysostome",
            source: "Homélies sur Matthieu",
            text: "Le refus de pardonner à notre frère rend inapplicable le pardon divin pour nous-mêmes. La miséricorde que nous accordons est la clef qui ouvre celle que nous recevons : l'amour n'a point de mesure, ni de 'septante fois sept fois'."
        }
    ],
    19: [
        {
            verseRange: [16, 26],
            author: "Saint Clément d'Alexandrie",
            source: "Quel riche sera sauvé ?",
            text: "La richesse matérielle n'est pas un mal en soi, le mal réside dans notre attachement passionné à la monnaie plutôt qu'à la vie divine. Vendre ses biens, pour le jeune homme riche, signifiait avant tout extirper de son cœur la racine idolâtrique de l'avidité."
        }
    ],
    20: [
        {
            verseRange: [1, 16],
            author: "Saint Grégoire le Grand",
            source: "Homélies sur les Évangiles",
            text: "La vigne est l'Église et le Maître appelle en tous les âges de la vie : l'enfance, la jeunesse, la vieillesse. Le même salut est octroyé à la dernière heure qu'à la première, dévoilant ainsi la pure grâce de Dieu qui supplante tous nos mérites calculés."
        }
    ],
    21: [
        {
            verseRange: [33, 43],
            author: "Saint Augustin",
            source: "Discours sur les Psaumes",
            text: "Les mauvais vignerons sont ceux qui usurpent la gloire de Dieu et accaparent les fruits spirituels pour leur pouvoir mondain. Mais de cette pierre rejetée par orgueil, le Père a fait la pierre d'angle de Son édifice indestructible, la sainte Église."
        }
    ],
    22: [
        {
            verseRange: [1, 14],
            author: "Saint Grégoire le Grand",
            source: "Homélies sur les Évangiles",
            text: "Le vêtement de noces, indispensable pour échapper aux ténèbres, n'est autre que la charité. Beaucoup viennent par la foi au banquet de l'Église, mais sans la robe nuptiale d'un amour véritable, la foi demeure inopérante et n'abrite aucun fruit pour l'éternité."
        }
    ],
    23: [
        {
            verseRange: [27, 32],
            author: "Saint Jérôme",
            source: "Commentaire sur l'Évangile de Matthieu",
            text: "Le Christ fustige les tombeaux blanchis pour briser la fausse piété. Porter extérieurement le masque de la justice tout en abritant les passions putréfiées, c'est se cacher du monde mais s'exhiber tristement devant Celui qui scrute les entrailles et le cœur."
        }
    ],
    24: [
        {
            verseRange: [42, 51],
            author: "Saint Basile de Césarée",
            source: "Grandes Règles Morales",
            text: "Le serviteur fidèle n'est jamais distrait, il scrute l'horizon dans l'attente du Maître céleste. Car la torpeur spirituelle et l'abandon aux voluptés mondaines ne traduisent pas une faiblesse innocente mais une folle et coupable présomption que le jugement tardera infiniment."
        }
    ],
    25: [
        {
            verseRange: [31, 46],
            author: "Saint Jean de la Croix",
            source: "Dits de lumière et d'amour",
            text: "Au soir de notre vie, nous serons jugés sur l'amour. Le Christ ne nous demandera pas l'inventaire de nos prodiges matériels, mais s'il a été étanché, vêtu et visité en la personne de nos frères affligés qui furent Ses propres membres transis."
        }
    ],
    26: [
        {
            verseRange: [26, 29],
            author: "Saint Thomas d'Aquin",
            source: "Laudes du Saint-Sacrement (Lauda Sion)",
            text: "Le Christ nous livre, sous les voiles de la substance du pain et du vin, Son vrai Corps et Son vrai Sang. Ce sacrifice de la Nouvelle Alliance annule les sacrifices anciens ; c'est là l'aliment vivifiant qui édifie l'humanité dans l'unité de l'Esprit."
        }
    ],
    27: [
        {
            verseRange: [45, 54],
            author: "Saint Maxime le Confesseur",
            source: "Questions à Thalassios",
            text: "Le cri d'abandon du Seigneur n'était pas l'expression d'un désespoir divin. Il portait en assumant solidairement notre angoisse indicible, pour y injecter depuis sa propre agonie toute la densité rédemptrice qui nous a rachetés de la mort éternelle."
        }
    ],
    28: [
        {
            verseRange: [16, 20],
            author: "Saint Léon le Grand",
            source: "Sermon sur l'Ascension",
            text: "Le Christ accomplit la promesse d'être avec son Église 'tous les jours jusqu'à la fin des temps'. Par Son départ, Sa présence en Esprit gagne tous les horizons de la terre ; par l'enseignement apôtre, toutes les nations sont baptisées et ressuscitées avec le Ressuscité."
        }
    ]
};

for (let chapId in newExegeses) {
    if (matthieu.chapters[chapId]) {
        matthieu.chapters[chapId].exegesis = newExegeses[chapId];
    }
}

function formatGospel(gospelName, dataObj) {
    let out = `export const ${gospelName} = {\n`;
    out += `    name: "${dataObj.name}",\n`;
    out += `    abbreviation: "${dataObj.abbreviation}",\n`;
    out += `    chapters: {\n`;

    let chapKeys = Object.keys(dataObj.chapters).map(Number).sort((a, b) => a - b);
    for (let i = 0; i < chapKeys.length; i++) {
        let chapNum = chapKeys[i];
        let chap = dataObj.chapters[chapNum];
        out += `        ${chapNum}: {\n`;
        out += `            title: "${chap.title}",\n`;
        out += `            verses: [\n`;

        for (let j = 0; j < chap.verses.length; j++) {
            let v = chap.verses[j];
            out += `                { number: ${v.number}, text: ${JSON.stringify(v.text)} }`;
            if (j < chap.verses.length - 1) out += `,\n`;
            else out += `\n`;
        }
        out += `            ],\n`;
        out += `            exegesis: [\n`;
        for (let j = 0; j < chap.exegesis.length; j++) {
            let exe = chap.exegesis[j];
            out += `                {\n`;
            out += `                    verseRange: [${exe.verseRange[0]}, ${exe.verseRange[1]}],\n`;
            out += `                    author: ${JSON.stringify(exe.author)},\n`;
            out += `                    source: ${JSON.stringify(exe.source)},\n`;
            out += `                    text: ${JSON.stringify(exe.text)}\n`;
            out += `                }`;
            if (j < chap.exegesis.length - 1) out += `,\n`;
            else out += `\n`;
        }
        out += `            ]\n`;
        out += `        }`;
        if (i < chapKeys.length - 1) out += `,\n`;
        else out += `\n`;
    }

    out += `    }\n};\n`;
    return out;
}

const finalContent = formatGospel('matthieu', matthieu);
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log("matthieu.js successfully updated with new exegeses!");
