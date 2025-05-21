import mpTestImage from '@/public/test-data/images/mp-test-image-1.png'

import pasTestImage from '@/public/test-data/images/pas-test-image-1.png'

export const testDataPAS = [
    {
        recordID: 1,
        objectType: "Coin",
        broadPeriod: 'Medieval',
        county: "Norfolk",
        description: "Silver sterling imitation of Louis IV of Bavaria, Holy Roman Emperor, mint of Aachen, obverse LVDOVICVS ROM REX, crowned bust facing, reverse MOnETA AQVEnSIS, eagle in first quarter, Mayhew 332, weight 1.30g, worn, c.1328",
        imgURL: pasTestImage
    },
    {
        recordID: 2,
        objectType: "Vessel",
        broadPeriod: 'Unknown',
        county: "Oxfordshire",
        description: "A pot mend of uncertain Roman to Post-Medieval date c. AD 43-1900. The mend is formed from two broadly flat but irregularly shaped faces connected by a projecting stem. It is a light grey colour and weighs 13.17 grams.",
        imgURL: pasTestImage
    },
    {
        recordID: 3,
        objectType: "Brooch",
        broadPeriod: 'Early medieval',
        county: "Oxfordshire",
        description: "An incomplete copper alloy object, possibly a Roman coin or Early Medieval nummular brooch. It features a bust in low relief with Roman stylistic features, though heavily worn.",
        imgURL: pasTestImage
    },
    {
        recordID: 4,
        objectType: "Unidentified Object",
        broadPeriod: 'Unknown',
        county: "Nottinghamshire",
        description: "A copper alloy disc with linear striations. Possibly a Roman coin, though unusually flat and incomplete, making identification uncertain.",
        imgURL: pasTestImage
    },
    {
        recordID: 5,
        objectType: "Spindle Whorl",
        broadPeriod: "Medieval",
        county: "Lincolnshire",
        description: "A lead alloy spindle whorl dating to the Medieval period, c. AD 1200–1500. It is bi-conical in shape with central perforation, heavily worn but with trace incised decoration.",
        imgURL: pasTestImage
    },
    {
        recordID: 6,
        objectType: "Mount",
        broadPeriod: "Post Medieval",
        county: "Kent",
        description: "A copper alloy belt or furniture mount, possibly 17th century. Lozenge-shaped with integral rivets on the back. Surface decoration is now mostly worn.",
        imgURL: pasTestImage
    },
    {
        recordID: 7,
        objectType: "Knife",
        broadPeriod: "Medieval",
        county: "Yorkshire",
        description: "A corroded iron blade fragment with tang, likely from a small utility knife used in the Medieval period. Blade is broken at both ends.",
        imgURL: pasTestImage
    },
    {
        recordID: 8,
        objectType: "Weight",
        broadPeriod: "Roman",
        county: "Surrey",
        description: "A cast lead weight, circular in plan and slightly domed. Roman dating is assumed based on form and findspot context. Diameter 35mm, weight 76g.",
        imgURL: pasTestImage
    },
    {
        recordID: 9,
        objectType: "Pendant",
        broadPeriod: "Anglo-Saxon",
        county: "Suffolk",
        description: "A gilded copper alloy pendant, teardrop-shaped with ring-and-dot decoration. Likely part of a necklace set dating to the 7th century AD.",
        imgURL: pasTestImage
    },
    {
        recordID: 10,
        objectType: "Jetton",
        broadPeriod: "Post Medieval",
        county: "Essex",
        description: "A copper alloy Nuremberg jetton with rose/orb design. Issued by Hans Krauwinckel II c. 1580–1610. Obverse and reverse both worn but partially legible.",
        imgURL: pasTestImage
    },
    {
        recordID: 11,
        objectType: "Thimble",
        broadPeriod: "Post Medieval",
        county: "Devon",
        description: "Cast copper alloy thimble with domed top and circular indentations. Possibly 17th or 18th century in date, used for domestic sewing.",
        imgURL: pasTestImage
    },
    {
        recordID: 12,
        objectType: "Pin",
        broadPeriod: "Roman",
        county: "Hampshire",
        description: "A small copper alloy pin with spherical head and tapering shaft. Likely Roman in date, used for fastening clothing or hair.",
        imgURL: pasTestImage
    }
];


export const testDataMP = [
    {
        recordID: 1,
        siteName: "Twelve Apostles",
        period: 'Neolithic and Bronze Age',
        county: "Yorkshire (West)",
        siteType: "Stone Circle",
        lattitude: "53.901555N",
        longitude: "1.80957W",
        condition: 3,
        ambience: 4,
        access: 2, 
        imgURL: mpTestImage
    },
    {
        recordID: 2,
        siteName: "Avebury",
        period: "Neolithic",
        county: "Wiltshire",
        siteType: "Henge and Stone Circle",
        lattitude: "51.4281N",
        longitude: "1.8541W",
        condition: 5,
        ambience: 5,
        access: 4,
        imgURL: mpTestImage
    },
    {
        recordID: 3,
        siteName: "Castlerigg",
        period: "Neolithic",
        county: "Cumbria",
        siteType: "Stone Circle",
        lattitude: "54.6025N",
        longitude: "3.0982W",
        condition: 4,
        ambience: 5,
        access: 3,
        imgURL: mpTestImage
    },
    {
        recordID: 4,
        siteName: "Silbury Hill",
        period: "Neolithic",
        county: "Wiltshire",
        siteType: "Artificial Mound",
        lattitude: "51.4154N",
        longitude: "1.8576W",
        condition: 5,
        ambience: 4,
        access: 4,
        imgURL: mpTestImage
    },
    {
        recordID: 5,
        siteName: "Maiden Castle",
        period: "Iron Age",
        county: "Dorset",
        siteType: "Hillfort",
        lattitude: "50.7055N",
        longitude: "2.4641W",
        condition: 4,
        ambience: 3,
        access: 3,
        imgURL: mpTestImage
    },
    {
        recordID: 6,
        siteName: "Old Sarum",
        period: "Iron Age to Medieval",
        county: "Wiltshire",
        siteType: "Hillfort and Medieval Castle",
        lattitude: "51.0919N",
        longitude: "1.7980W",
        condition: 4,
        ambience: 4,
        access: 4,
        imgURL: mpTestImage
    },
    {
        recordID: 7,
        siteName: "Grimes Graves",
        period: "Neolithic",
        county: "Norfolk",
        siteType: "Flint Mines",
        lattitude: "52.5171N",
        longitude: "0.6502E",
        condition: 3,
        ambience: 3,
        access: 2,
        imgURL: mpTestImage
    },
    {
        recordID: 8,
        siteName: "Boskednan Circle",
        period: "Bronze Age",
        county: "Cornwall",
        siteType: "Stone Circle",
        lattitude: "50.1690N",
        longitude: "5.5733W",
        condition: 3,
        ambience: 5,
        access: 2,
        imgURL: mpTestImage
    },
    {
        recordID: 9,
        siteName: "Callanish Stones",
        period: "Neolithic",
        county: "Western Isles",
        siteType: "Stone Circle",
        lattitude: "58.1989N",
        longitude: "6.7441W",
        condition: 5,
        ambience: 5,
        access: 3,
        imgURL: mpTestImage
    },
    {
        recordID: 10,
        siteName: "Barclodiad y Gawres",
        period: "Neolithic",
        county: "Anglesey",
        siteType: "Chambered Tomb",
        lattitude: "53.2198N",
        longitude: "4.5242W",
        condition: 4,
        ambience: 4,
        access: 3,
        imgURL: mpTestImage
    },
    {
        recordID: 11,
        siteName: "Uffington White Horse",
        period: "Iron Age",
        county: "Oxfordshire",
        siteType: "Hill Figure",
        lattitude: "51.5772N",
        longitude: "1.5678W",
        condition: 4,
        ambience: 5,
        access: 4,
        imgURL: mpTestImage
    },
    {
        recordID: 12,
        siteName: "Nine Ladies",
        period: "Bronze Age",
        county: "Derbyshire",
        siteType: "Stone Circle",
        lattitude: "53.1791N",
        longitude: "1.6102W",
        condition: 3,
        ambience: 4,
        access: 3,
        imgURL: mpTestImage
    }
];
