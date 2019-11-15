# roomBookingAPI
 This is a single page Application programming interface for room booking system

## Installation
```
git clone https://github.com/kabirkhyrul/roomBookingAPI.git
cd roomBookingAPI
npm install
```
- Now Create a database and a table with below structure

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `booking_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `nid` int(11) NOT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

- Change database credential in /public/javascripts/db.js

```
npm start
```
Browse with this url http://localhost:3000/

- Happy Coding :neckbeard: