-- MySQL dump 10.13  Distrib 5.5.42, for Linux (x86_64)
--
-- Host: 10.0.10.193    Database: vidlydb711
-- ------------------------------------------------------
-- Server version	5.6.23-log

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `count` int(255) NOT NULL,
  `dislike_count` int(255) NOT NULL,
  `video_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (63,1,0,66,97);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uploads` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `mediaId` varchar(255) NOT NULL,
  `zencoder_id` varchar(255) NOT NULL,
  `input` longtext NOT NULL,
  `outputs` longtext NOT NULL,
  `state` varchar(255) NOT NULL,
  `thumbnail` text NOT NULL,
  `description` varchar(255) NOT NULL,
  `isPrivate` tinyint(1) NOT NULL,
  `input_file` varchar(255) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `submitted_at` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (69,'','','186577373','{\"id\":186548317,\"format\":\"mpeg4\",\"frame_rate\":23.976,\"duration_in_ms\":15185,\"audio_sample_rate\":44100,\"audio_bitrate_in_kbps\":96,\"audio_codec\":\"aac\",\"height\":360,\"width\":640,\"file_size_in_bytes\":812190,\"video_codec\":\"h264\",\"total_bitrate_in_kbps\":424,\"channels\":\"2\",\"video_bitrate_in_kbps\":328,\"state\":\"finished\",\"md5_checksum\":null}','{\"MP4\":{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/17b71c2f2a0df4c2fcf7784788ea9654.mp4\",\"format\":\"mpeg4\",\"width\":640,\"height\":360},\"WebM\":{\"url\":\"http://vidly-videos-dev.s3.amazonaws.com/zensockets/2942b710e919e0083567512db0fa40d9.webm\",\"format\":\"webm\",\"width\":640,\"height\":360}}','finished','{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/0_69.png\",\"size\":\"640x360\"}','public upload',0,'https://www.filepicker.io/api/file/KGxsm422S1OHQO1rD1Ub','e5f0h','2015-09-14','2015-09-14 17:14:47'),(70,'97','','186579194','{\"id\":186550137,\"format\":\"mpeg4\",\"frame_rate\":23.976,\"duration_in_ms\":15185,\"audio_sample_rate\":44100,\"audio_bitrate_in_kbps\":96,\"audio_codec\":\"aac\",\"height\":360,\"width\":640,\"file_size_in_bytes\":812190,\"video_codec\":\"h264\",\"total_bitrate_in_kbps\":424,\"channels\":\"2\",\"video_bitrate_in_kbps\":328,\"state\":\"finished\",\"md5_checksum\":null}','{\"MP4\":{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/a9fb197eee72bf53d44ab0200c413db2.mp4\",\"format\":\"mpeg4\",\"width\":640,\"height\":360},\"WebM\":{\"url\":\"http://vidly-videos-dev.s3.amazonaws.com/zensockets/76697f7e302e7e3e442cd73dea2cb5c7.webm\",\"format\":\"webm\",\"width\":640,\"height\":360}}','finished','{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/0_70.png\",\"size\":\"640x360\"}','video logged in test',0,'https://www.filepicker.io/api/file/2ziljyVNT6KZeFyPScrq','pli4zkw3ik9','2015-09-14','2015-09-14 17:14:48'),(71,'97','','186579388','{\"id\":186550332,\"format\":\"mpeg4\",\"frame_rate\":23.976,\"duration_in_ms\":15185,\"audio_sample_rate\":44100,\"audio_bitrate_in_kbps\":96,\"audio_codec\":\"aac\",\"height\":360,\"width\":640,\"file_size_in_bytes\":812190,\"video_codec\":\"h264\",\"total_bitrate_in_kbps\":424,\"channels\":\"2\",\"video_bitrate_in_kbps\":328,\"state\":\"finished\",\"md5_checksum\":null}','{\"MP4\":{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/28dbadc234cfc4476a7ecf8139ccf778.mp4\",\"format\":\"mpeg4\",\"width\":640,\"height\":360},\"WebM\":{\"url\":\"http://vidly-videos-dev.s3.amazonaws.com/zensockets/4734873b726b43ba0c99b6976ba55301.webm\",\"format\":\"webm\",\"width\":640,\"height\":360}}','finished','{\"url\":\"https://vidly-videos-dev.s3.amazonaws.com/zensockets/0_71.png\",\"size\":\"640x360\"}','testing private vide',1,'https://www.filepicker.io/api/file/lm1mGrwSS2GRyCc1jdzF','pli4zkw3ik9','2015-09-14','2015-09-14 17:14:48');
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastUpdated` date NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `random_no` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (97,'Jordan','jordansimps@me.com','5f4dcc3b5aa765d61d8327deb882cf99','0000-00-00',1,'y5KKQ','2015-09-14 13:44:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `views` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `view_count` int(255) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `video_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (12,1,'127.0.0.1',67),(13,1,'127.0.0.1',66),(14,1,'::ffff:127.0.0.1',66),(15,1,'127.0.0.1',69),(16,1,'127.0.0.1',71);
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-14 20:25:34
