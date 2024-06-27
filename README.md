# How to run:
-> clone: git clone https://github.com/Nikolayy1/ccl2_marketplace.git __
-> npm install __
-> npm run dev __


# Database:

-> create .env file __
    .env Structure: __ 
        DB_HOST="hostname" __
        DB_PORT=1234 __
        DB_DATABASE="dbname" __
        DB_USERNAME="dbusername" __
        DB_PASSWORD="password" __
-> setup a database with tables: __
`users` ( __
  `userId` int NOT NULL, __
  `name` text NOT NULL, __
  `email` text NOT NULL, __
  `password` text NOT NULL, __
  `phone` int NOT NULL, __
  `street` text NOT NULL, __
  `city` text NOT NULL, __
  `postalCode` int NOT NULL, __
  `country` text NOT NULL, __
  `profilePicture` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci, __
  `cartId` int DEFAULT NULL __
  )  __
 __
`products` ( __
  `productId` int NOT NULL, __
  `name` text NOT NULL, __
  `price` float NOT NULL, __
  `description` text NOT NULL, __
  `userId` int NOT NULL __
  ) __
 __
  `carts` (
  `cartId` int NOT NULL, __
  `productId` int NOT NULL, __
  `date` date NOT NULL __
  ) __
 __