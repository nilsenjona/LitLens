  ### APIs
  
  ## API#1: Fetch Open Library based on string search:
  example: title="The Last Unicorn", author="Peter S. Beagle"
  the API works if minimum one of them is defined.
  GET request: https://openlibrary.org/search.json?q=<string>&language=eng
  Header: User-Agent: "Temporary student app (nilsenjona@gmail.com)"
  Template title+author request: https://openlibrary.org/search.json?q=<title>&<author>&language=eng
  Example title=author with string: https://openlibrary.org/search.json?q=The Last Unicorn Peter S. Beagle&language=eng
  Template ISBN request: https://openlibrary.org/search.json?q=<ISBN>&language=eng
  Example ISBN: https://openlibrary.org/search.json?q=9780547722023&language=eng
  Response sample: {
  "numFound": 8,
  "start": 0,
  "numFoundExact": true,
  "num_found": 8,
  "documentation_url": "https://openlibrary.org/dev/docs/api/search",
  "q": "The Last Unicorn Peter S. Beagle",
  "offset": null,
  "docs": [
    {
      "author_key": [
        "OL26165A"
      ],
      "author_name": [
        "Peter S. Beagle"
      ],
      "cover_edition_key": "OL1855803M",
      "cover_i": 294651,
      "ebook_access": "printdisabled",
      "edition_count": 37,
      "first_publish_year": 1968,
      "has_fulltext": true,
      "ia": [
        "lastunicorn00beag_0",
        "lastunicorn00beag",
        "lastunicorn00pete",
        "lastunicorn0000beag",
        "lastunicornlostv0000beag",
        "lastunicorn01beag"
      ],
      "ia_collection": [
        "americana",
        "americanuniversity-ol",
        "belmont-ol",
        "binghamton-ol",
        "cnusd-ol",
        "delawarecountydistrictlibrary",
        "framingham-ol",
        "internetarchivebooks",
        "ithacacollege-ol",
        "johnshopkins-ol",
        "library_of_atlantis",
        "printdisabled",
        "rochester-ol",
        "unb-ol",
        "uni-ol",
        "universityofcoloradoboulder-ol",
        "wilsoncollege-ol"
      ],
      "key": "/works/OL26459W",
      "language": [
        "fre",
        "eng",
        "spa"
      ],
      "public_scan_b": false,
      "title": "The Last Unicorn"
    },
    {
      "author_key": [
        "OL190430A"
      ],
      "author_name": [
        "Timothy S. Miller"
      ],
      "ebook_access": "no_ebook",
      "edition_count": 2,
      "first_publish_year": 2024,
      "has_fulltext": false,
      "key": "/works/OL37831802W",
      "language": [
        "eng"
      ],
      "public_scan_b": false,
      "title": "Peter S. Beagle's the Last Unicorn"
    },
    {
      "author_key": [
        "OL15410289A"
      ],
      "author_name": [
        "peter s. beagle"
      ],
      "ebook_access": "printdisabled",
      "edition_count": 1,
      "first_publish_year": 1968,
      "has_fulltext": true,
      "ia": [
        "lastunicorn0000pete"
      ],
      "ia_collection": [
        "internetarchivebooks",
        "printdisabled"
      ],
      "key": "/works/OL43253458W",
      "language": [
        "eng"
      ],
      "public_scan_b": false,
      "title": "the last unicorn"
    },
    {
      "author_key": [
        "OL26165A"
      ],
      "author_name": [
        "Peter S. Beagle"
      ],
      "cover_edition_key": "OL38429425M",
      "cover_i": 13298284,
      "ebook_access": "no_ebook",
      "edition_count": 3,
      "first_publish_year": 2023,
      "has_fulltext": false,
      "key": "/works/OL28018260W",
      "language": [
        "eng"
      ],
      "public_scan_b": false,
      "title": "Way Home"
    },
    {
      "author_key": [
        "OL13376157A"
      ],
      "author_name": [
        "Peter S. Beagle"
      ],
      "ebook_access": "no_ebook",
      "edition_count": 2,
      "first_publish_year": 2024,
      "has_fulltext": false,
      "key": "/works/OL37827577W",
      "language": [
        "eng"
      ],
      "public_scan_b": false,
      "title": "Way Home"
    },
    {
      "author_key": [
        "OL26165A"
      ],
      "author_name": [
        "Peter S. Beagle"
      ],
      "cover_edition_key": "OL4726734M",
      "cover_i": 13053999,
      "ebook_access": "borrowable",
      "edition_count": 5,
      "first_publish_year": 1978,
      "has_fulltext": true,
      "ia": [
        "fantasyworldsofp0000pete",
        "fantasyworldsofp0000beag"
      ],
      "ia_collection": [
        "binghamton-ol",
        "framingham-ol",
        "inlibrary",
        "internetarchivebooks",
        "printdisabled",
        "the-claremont-colleges-ol",
        "unb-ol",
        "uni-ol",
        "universityofcoloradoboulder-ol",
        "universityofoklahoma-ol"
      ],
      "key": "/works/OL26449W",
      "language": [
        "eng"
      ],
      "lending_edition_s": "OL17575531M",
      "lending_identifier_s": "fantasyworldsofp0000pete",
      "public_scan_b": false,
      "title": "The fantasy worlds of Peter Beagle"
    },
    {
      "author_key": [
        "OL1081477A"
      ],
      "author_name": [
        "Peter B. Gillis"
      ],
      "cover_edition_key": "OL27128776M",
      "cover_i": 12683861,
      "ebook_access": "printdisabled",
      "edition_count": 1,
      "first_publish_year": 2011,
      "has_fulltext": true,
      "ia": [
        "lastunicorn0000gill"
      ],
      "ia_collection": [
        "internetarchivebooks",
        "printdisabled"
      ],
      "key": "/works/OL19948410W",
      "language": [
        "eng"
      ],
      "public_scan_b": false,
      "title": "The last unicorn"
    },
    {
      "author_key": [
        "OL5140839A"
      ],
      "author_name": [
        "Laura Miller"
      ],
      "cover_edition_key": "OL27226805M",
      "cover_i": 13081709,
      "ebook_access": "printdisabled",
      "edition_count": 2,
      "first_publish_year": 2016,
      "has_fulltext": true,
      "ia": [
        "literarywonderla0000unse"
      ],
      "ia_collection": [
        "americanuniversity-ol",
        "binghamton-ol",
        "dartmouthlibrary-ol",
        "hamiltonpubliclibrary-ol",
        "internetarchivebooks",
        "kalamazoocollege-ol",
        "printdisabled",
        "tulsacc-ol",
        "wilsoncollege-ol"
      ],
      "key": "/works/OL20046779W",
      "language": [
        "chi",
        "eng"
      ],
      "public_scan_b": false,
      "title": "Literary wonderlands"
    }
  ]
}

  ## API#2: Fetch Open Library book description based on API#1:
  Use "key" from API#1 ("/works/OL26459W" in the above example).
  GET request: https://openlibrary.org<docs.key>.json
  Header: User-Agent: "Temporary student app (nilsenjona@gmail.com)"
  GET request sample: https://openlibrary.org/works/OL26459W.json
  Response sample:
  {
  "title": "The Last Unicorn",
  "covers": [
    294651,
    5539316,
    8776761
  ],
  "first_sentence": {
    "type": "/type/text",
    "value": "The unicorn lived in a lilac wood, and she lived all alone."
  },
  "first_publish_date": "1900",
  "key": "/works/OL26459W",
  "authors": [
    {
      "author": {
        "key": "/authors/OL26165A"
      },
      "type": {
        "key": "/type/author_role"
      }
    }
  ],
  "excerpts": [
    {
      "excerpt": "The unicorn lived in a lilac wood, and she lived all alone."
    }
  ],
  "type": {
    "key": "/type/work"
  },
  "subjects": [
    "Unicorns",
    "Fiction",
    "Legends and stories",
    "Juvenile literature",
    "American Fantasy fiction",
    "Large type books",
    "Fiction, fantasy, general",
    "Fantasy fiction",
    "Fiction, general",
    "Fiction, science fiction, general",
    "American literature",
    "Comics & graphic novels, fantasy, general",
    "Unicornios",
    "Novelas"
  ],
  "description": {
    "type": "/type/text",
    "value": "*The unicorn lived in a lilac wood, and she lived all alone…*\r\n\r\n …so she ventured out from the safety of the enchanted forest on a quest for others of her kind. Joined along the way by the bumbling magician Schmendrick and the indomitable Molly Grue, the unicorn learns all about the joys and sorrows of life and love before meeting her destiny in the castle of a despondent monarch—and confronting the creature that would drive her kind to extinction....\r\n\r\nIn *The Last Unicorn*, renowned and beloved novelist Peter S. Beagle spins a poignant tale of love, loss, and wonder that has resonated with millions of readers around the world."
  },
  "dewey_number": [
    "823/.9/1"
  ],
  "latest_revision": 25,
  "revision": 25,
  "created": {
    "type": "/type/datetime",
    "value": "2009-10-12T22:31:17.033421"
  },
  "last_modified": {
    "type": "/type/datetime",
    "value": "2024-08-20T21:49:18.679632"
  }
}

  ## API#3: Fetch book image
  Use "cover_i" value from API#1 (above sample=294651)
  GET request: https://covers.openlibrary.org/b/id/<cover_i>-M.jpg
  Header: User-Agent: "Temporary student app (nilsenjona@gmail.com)"
  GET request sample: https://covers.openlibrary.org/b/id/294651-M.jpg

  ## API#4: Claude query for similar book recommendations
  Fields to inject:
  title=API#1.title
  author=API#1.author_name
  year=API#1.first_publish_year
  POST request example:
  Header:
  x-api-key: <my Anthropic API key>
  anthropic-version: 2023-06-01
  content-type: application/json
  Body:
{
  "model": "claude-opus-4-6",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": "Return ONLY valid JSON: an array of 3 objects. Each object must contain: \"title\" (string), \"author\" (string), \"year\" (number), \"isbn13\" (string; use \"\" if unknown or uncertain), \"theme\" (string, max 200 chars), and \"reason\" (string, max 200 chars). Recommend 3 books similar to \"The Hobbit\" (1938). Rules: Do NOT exclude a book if ISBN13 is unknown. Do NOT invent ISBNs. If unsure about ISBN13, set \"isbn13\" to \"\". No markdown, no backticks, no comments, no explanations. Output must be valid JSON only."
    }
  ]
}
  Response sample:
  {
  "model": "claude-opus-4-6",
  "id": "msg_019RzaS4bp8qXCWBthSnZPs2",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "[{\"title\":\"The Chronicles of Narnia: The Lion, the Witch and the Wardrobe\",\"author\":\"C.S. Lewis\",\"year\":1950,\"isbn13\":\"9780064404990\",\"theme\":\"A magical world discovered by children, featuring epic battles between good and evil, talking creatures, and a heroic quest.\",\"reason\":\"Like The Hobbit, it features an ordinary protagonist thrust into a magical land filled with adventure, mythical creatures, and a grand struggle against darkness.\"},{\"title\":\"The Princess Bride\",\"author\":\"William Goldman\",\"year\":1973,\"isbn13\":\"9780156035217\",\"theme\":\"A fairy-tale adventure filled with sword fights, giants, pirates, true love, and witty humor across a fantastical landscape.\",\"reason\":\"Shares The Hobbit's blend of lighthearted humor, swashbuckling adventure, and classic storytelling with memorable characters on an unlikely quest.\"},{\"title\":\"A Wizard of Earthsea\",\"author\":\"Ursula K. Le Guin\",\"year\":1968,\"isbn13\":\"9780547722023\",\"theme\":\"A young wizard's coming-of-age journey through an archipelago world, confronting magical dangers and his own inner shadow.\",\"reason\":\"Like The Hobbit, it follows an unassuming protagonist on a transformative journey through a richly imagined fantasy world with elegant, accessible prose.\"}]"
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 161,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 0,
      "ephemeral_1h_input_tokens": 0
    },
    "output_tokens": 309,
    "service_tier": "standard",
    "inference_geo": "global"
  }
}