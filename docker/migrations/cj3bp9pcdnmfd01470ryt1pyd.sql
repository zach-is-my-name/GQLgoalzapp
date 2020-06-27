-- MySQL dump 10.14  Distrib 5.5.64-MariaDB, for Linux (x86_64)
--
-- Host: client1-prod.cluster-clfeqqifnebj.eu-west-1.rds.amazonaws.com    Database: cj3bp9pcdnmfd01470ryt1pyd
-- ------------------------------------------------------
-- Server version	5.6.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClonedStep`
--

DROP TABLE IF EXISTS `ClonedStep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClonedStep` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stepsId` mediumtext COLLATE utf8mb4_unicode_ci,
  `positionIndex` int(11) DEFAULT NULL,
  `step` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `suggestedStep` tinyint(1) DEFAULT NULL,
  `suggestRemove` tinyint(1) DEFAULT NULL,
  `suggestEdit` tinyint(1) DEFAULT NULL,
  `suggestMove` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClonedStep`
--

LOCK TABLES `ClonedStep` WRITE;
/*!40000 ALTER TABLE `ClonedStep` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClonedStep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `File`
--

DROP TABLE IF EXISTS `File`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `File` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contentType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `secret_UNIQUE` (`secret`(191)),
  UNIQUE KEY `url_UNIQUE` (`url`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `File`
--

LOCK TABLES `File` WRITE;
/*!40000 ALTER TABLE `File` DISABLE KEYS */;
/*!40000 ALTER TABLE `File` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GoalDoc`
--

DROP TABLE IF EXISTS `GoalDoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GoalDoc` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `goal` text COLLATE utf8mb4_unicode_ci,
  `proxyAddress` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GoalDoc`
--

LOCK TABLES `GoalDoc` WRITE;
/*!40000 ALTER TABLE `GoalDoc` DISABLE KEYS */;
INSERT INTO `GoalDoc` VALUES ('ckbh5x9mt0aou0127vrs5mhlw','2020-06-16 00:02:42','2020-06-16 00:02:42','Goal0','0x99eC3D381cec39F6aDC8Ee4152AA3196147f901B');
/*!40000 ALTER TABLE `GoalDoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Step`
--

DROP TABLE IF EXISTS `Step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Step` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `step` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `suggestedStep` tinyint(1) DEFAULT NULL,
  `positionIndex` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Step`
--

LOCK TABLES `Step` WRITE;
/*!40000 ALTER TABLE `Step` DISABLE KEYS */;
/*!40000 ALTER TABLE `Step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth0UserId` text COLLATE utf8mb4_unicode_ci,
  `email` mediumtext COLLATE utf8mb4_unicode_ci,
  `password` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `userName_UNIQUE` (`userName`(191)),
  UNIQUE KEY `auth0UserId_UNIQUE` (`auth0UserId`(191)),
  UNIQUE KEY `email_UNIQUE` (`email`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cj3lusp6fs7um0155g4eyo49z','2017-06-06 17:43:02','2017-06-06 17:43:02','Stency','google-oauth2|116142341972599294177',NULL,NULL),('cjl5mkgkd0ypx0157l9c1zrxk','2018-08-22 21:03:03','2018-08-22 21:03:03','zach michaels','google-oauth2|103906248850886849597',NULL,NULL),('cjo3e5nfh0r5n0117fguvi8bu','2018-11-04 21:31:10','2018-11-04 21:31:10','jake',NULL,'jake@jake.com','$2a$10$aFVc.EzDKa6gEEcqY8TfoOUzo8NVJ.hqqTSho6AZD7Epj53dzR0DK'),('ck4a0u4je08zt0120yy7xvx4f','2019-12-17 15:27:58','2019-12-17 15:27:58','zach',NULL,'zachmichaelsnewark@gmail.com','$2a$10$l2yDEyGndwSXnPgthkXhz.BYJc0QkV7a226pWQSGBpevRQRpZdHbO'),('ck79z7tnm0gr501888otuxi7g','2020-03-02 04:41:45','2020-03-02 04:41:45','George ',NULL,'Grecogeorge8@gmail.com ','$2a$10$EzRuKrJJbiSD9vHVnwm79utmtjSyuy5I9lieWaIKfR/HEmf4ehIUK'),('cka3amlfo0uwl019791fznu8u','2020-05-12 02:25:54','2020-05-12 02:25:54','ablsd',NULL,'pivotatata@gmail.com','$2a$10$SYznw1PnR9xgBZ7YnwnrR.2xb9WE2Mu5DUGp3NRnKYseWkS4rMPom');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_RelayId`
--

DROP TABLE IF EXISTS `_RelayId`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_RelayId` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `modelId` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_RelayId`
--

LOCK TABLES `_RelayId` WRITE;
/*!40000 ALTER TABLE `_RelayId` DISABLE KEYS */;
INSERT INTO `_RelayId` VALUES ('cj3lusp6fs7um0155g4eyo49z','cj3bp9pcfnmg301479yx8ubd1'),('cjl5mkgkd0ypx0157l9c1zrxk','cj3bp9pcfnmg301479yx8ubd1'),('cjo3e5nfh0r5n0117fguvi8bu','cj3bp9pcfnmg301479yx8ubd1'),('ck4a0u4je08zt0120yy7xvx4f','cj3bp9pcfnmg301479yx8ubd1'),('ck79z7tnm0gr501888otuxi7g','cj3bp9pcfnmg301479yx8ubd1'),('cka3amlfo0uwl019791fznu8u','cj3bp9pcfnmg301479yx8ubd1'),('ckbh5x9mt0aou0127vrs5mhlw','cj3bp9pcfnmfs01479nfsfriw');
/*!40000 ALTER TABLE `_RelayId` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cj3bp9pcgnmgd0147lw3nyl8u`
--

DROP TABLE IF EXISTS `cj3bp9pcgnmgd0147lw3nyl8u`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cj3bp9pcgnmgd0147lw3nyl8u` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `A` char(25) CHARACTER SET utf8 NOT NULL,
  `B` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `AB_unique` (`A`,`B`),
  KEY `A` (`A`),
  KEY `B` (`B`),
  CONSTRAINT `cj3bp9pcgnmgd0147lw3nyl8u_ibfk_1` FOREIGN KEY (`A`) REFERENCES `GoalDoc` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cj3bp9pcgnmgd0147lw3nyl8u_ibfk_2` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cj3bp9pcgnmgd0147lw3nyl8u`
--

LOCK TABLES `cj3bp9pcgnmgd0147lw3nyl8u` WRITE;
/*!40000 ALTER TABLE `cj3bp9pcgnmgd0147lw3nyl8u` DISABLE KEYS */;
INSERT INTO `cj3bp9pcgnmgd0147lw3nyl8u` VALUES ('ckbh5x9mw0aov0127srno6r66','ckbh5x9mt0aou0127vrs5mhlw','cj3lusp6fs7um0155g4eyo49z');
/*!40000 ALTER TABLE `cj3bp9pcgnmgd0147lw3nyl8u` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cj3bqwg4lq0tu01857r26dfle`
--

DROP TABLE IF EXISTS `cj3bqwg4lq0tu01857r26dfle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cj3bqwg4lq0tu01857r26dfle` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `A` char(25) CHARACTER SET utf8 NOT NULL,
  `B` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `AB_unique` (`A`,`B`),
  KEY `A` (`A`),
  KEY `B` (`B`),
  CONSTRAINT `cj3bqwg4lq0tu01857r26dfle_ibfk_1` FOREIGN KEY (`A`) REFERENCES `GoalDoc` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cj3bqwg4lq0tu01857r26dfle_ibfk_2` FOREIGN KEY (`B`) REFERENCES `Step` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cj3bqwg4lq0tu01857r26dfle`
--

LOCK TABLES `cj3bqwg4lq0tu01857r26dfle` WRITE;
/*!40000 ALTER TABLE `cj3bqwg4lq0tu01857r26dfle` DISABLE KEYS */;
/*!40000 ALTER TABLE `cj3bqwg4lq0tu01857r26dfle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cjauafedi14xx0125s9wkjhjs`
--

DROP TABLE IF EXISTS `cjauafedi14xx0125s9wkjhjs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cjauafedi14xx0125s9wkjhjs` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `A` char(25) CHARACTER SET utf8 NOT NULL,
  `B` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `AB_unique` (`A`,`B`),
  KEY `A` (`A`),
  KEY `B` (`B`),
  CONSTRAINT `cjauafedi14xx0125s9wkjhjs_ibfk_1` FOREIGN KEY (`A`) REFERENCES `ClonedStep` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cjauafedi14xx0125s9wkjhjs_ibfk_2` FOREIGN KEY (`B`) REFERENCES `GoalDoc` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cjauafedi14xx0125s9wkjhjs`
--

LOCK TABLES `cjauafedi14xx0125s9wkjhjs` WRITE;
/*!40000 ALTER TABLE `cjauafedi14xx0125s9wkjhjs` DISABLE KEYS */;
/*!40000 ALTER TABLE `cjauafedi14xx0125s9wkjhjs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cjauafedi14y00125nwg4p3ai`
--

DROP TABLE IF EXISTS `cjauafedi14y00125nwg4p3ai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cjauafedi14y00125nwg4p3ai` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `A` char(25) CHARACTER SET utf8 NOT NULL,
  `B` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `AB_unique` (`A`,`B`),
  KEY `A` (`A`),
  KEY `B` (`B`),
  CONSTRAINT `cjauafedi14y00125nwg4p3ai_ibfk_1` FOREIGN KEY (`A`) REFERENCES `ClonedStep` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cjauafedi14y00125nwg4p3ai_ibfk_2` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cjauafedi14y00125nwg4p3ai`
--

LOCK TABLES `cjauafedi14y00125nwg4p3ai` WRITE;
/*!40000 ALTER TABLE `cjauafedi14y00125nwg4p3ai` DISABLE KEYS */;
/*!40000 ALTER TABLE `cjauafedi14y00125nwg4p3ai` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-23 14:55:14
