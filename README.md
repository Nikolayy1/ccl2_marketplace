# How to run:
-> clone: git clone https://github.com/Nikolayy1/ccl2_marketplace.git\
-> npm install\
-> npm run dev


# Database:

-> create .env file
    .env Structure:
        DB_HOST="hostname"
        DB_PORT=1234
        DB_DATABASE="dbname"
        DB_USERNAME="dbusername"
        DB_PASSWORD="password"
-> setup a database with tables:
`users` (
  `userId` int NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phone` int NOT NULL,
  `street` text NOT NULL,
  `city` text NOT NULL,
  `postalCode` int NOT NULL,
  `country` text NOT NULL,
  `profilePicture` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `cartId` int DEFAULT NULL
  ) 

`products` (
  `productId` int NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `userId` int NOT NULL
  )

  `carts` (
  `cartId` int NOT NULL,
  `productId` int NOT NULL,
  `date` date NOT NULL
  )
