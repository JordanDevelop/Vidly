-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 28, 2015 at 05:59 PM
-- Server version: 5.5.37-0ubuntu0.13.10.1
-- PHP Version: 5.5.3-1ubuntu2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `vidly`
--

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `count` int(255) NOT NULL,
  `dislike_count` int(255) NOT NULL,
  `video_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=87 ;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `count`, `dislike_count`, `video_id`, `user_id`) VALUES
(42, 1, 0, 0, 0),
(49, 1, 0, 53, 52),
(50, 1, 0, 55, 52),
(51, 1, 0, 54, 52),
(52, 1, 0, 64, 52),
(53, 1, 0, 51, 43),
(54, 1, 0, 52, 43),
(55, 1, 0, 55, 43),
(57, 1, 0, 65, 95),
(59, 1, 0, 52, 95),
(60, 1, 0, 70, 100),
(62, 1, 0, 51, 100),
(63, 1, 0, 69, 100),
(64, 1, 0, 51, 124),
(86, 1, 0, 201, 43);

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE IF NOT EXISTS `uploads` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `v_id` varchar(6) NOT NULL,
  `keywords` text NOT NULL,
  `mediaId` varchar(255) NOT NULL,
  `zencoder_id` varchar(255) NOT NULL,
  `input` longtext NOT NULL,
  `outputs` longtext NOT NULL,
  `state` varchar(255) NOT NULL,
  `thumbnail` text NOT NULL,
  `description` varchar(255) NOT NULL,
  `isPrivate` tinyint(1) NOT NULL,
  `nsfw` tinyint(1) NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  `Delete` tinyint(1) NOT NULL DEFAULT '0',
  `input_file` varchar(255) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `submitted_at` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=218 ;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `userId`, `v_id`, `keywords`, `mediaId`, `zencoder_id`, `input`, `outputs`, `state`, `thumbnail`, `description`, `isPrivate`, `nsfw`, `Active`, `Delete`, `input_file`, `channel`, `submitted_at`, `created`) VALUES
(204, '', 'yhyf', 'ftgt', '', '188979468', '{"id":188950412,"format":"mpeg4","frame_rate":25,"duration_in_ms":5312,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":1055736,"video_codec":"h264","total_bitrate_in_kbps":1589,"channels":"6","video_bitrate_in_kbps":1205,"state":"finished","md5_checksum":null}', '//c.vidly.io/32834b2888fba8e3ed85c7bab58ed2ad.mp4', 'finished', '//c.vidly.io/0_204.png', 'tytyfnh', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/FdPYMyrSkuPAt1GWuWAJ', '804ny', '2015-09-24', '2015-09-24 11:55:21'),
(205, '', 'gfgd', 'fgfg', '', '188979885', '{"id":188950829,"format":"mpeg4","frame_rate":25,"duration_in_ms":5312,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":1055736,"video_codec":"h264","total_bitrate_in_kbps":1589,"channels":"6","video_bitrate_in_kbps":1205,"state":"finished","md5_checksum":null}', '//c.vidly.io/1647962d00852ff23a5d5be7691aa1c2.mp4', 'finished', '//c.vidly.io/0_205.png', 'dfgft', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/e79cLRSSdukKubGyoIBC', '804ny', '2015-09-24', '2015-09-24 11:59:10'),
(206, '', 'fgff', 'gfgg', '', '188980549', '{"id":188951493,"format":"mpeg4","frame_rate":25,"duration_in_ms":5312,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":1055736,"video_codec":"h264","total_bitrate_in_kbps":1589,"channels":"6","video_bitrate_in_kbps":1205,"state":"finished","md5_checksum":null}', '//c.vidly.io/a77b759929374ba0eed8df0737d7336e.mp4', 'finished', '//c.vidly.io/0_206.png', 'cfgffg', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/mpSwidsVTXSlzoacYVmV', '804ny', '2015-09-24', '2015-09-24 12:03:28'),
(207, '', 'iyey', 'idley', '', '188981879', '{"id":188952823,"format":"mpeg4","frame_rate":25,"duration_in_ms":213460,"audio_sample_rate":44100,"audio_bitrate_in_kbps":192,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":79671267,"video_codec":"h264","total_bitrate_in_kbps":2983,"channels":"2","video_bitrate_in_kbps":2791,"state":"finished","md5_checksum":null}', '//c.vidly.io/749076c870af906cf5028cc6efb4cda9.mp4', 'finished', '//c.vidly.io/0_207.png', 'idley', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/Gra1hFKqSv6fwx0SuogB', '1sagrx561or', '2015-09-24', '2015-09-24 12:13:00'),
(208, '43', 'ghff', 'ghff', '', '188984504', '{"id":188955448,"format":"mpeg4","frame_rate":25,"duration_in_ms":15318,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":480,"width":640,"file_size_in_bytes":2097619,"video_codec":"h264","total_bitrate_in_kbps":1093,"channels":"6","video_bitrate_in_kbps":709,"state":"finished","md5_checksum":null}', '//c.vidly.io/07b02f84c281aa1a2501fcba20fe3208.mp4', 'finished', '//c.vidly.io/0_208.png', 'ghfghf', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/Tlk2Q4hlTleqHtYZvwWB', 've4md', '2015-09-24', '2015-09-24 12:30:09'),
(213, '142', 'ggdg', 'sdsd', '', '189779185', '{"id":189750129,"format":"mpeg4","frame_rate":25,"duration_in_ms":62315,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":10498677,"video_codec":"h264","total_bitrate_in_kbps":1343,"channels":"6","video_bitrate_in_kbps":959,"state":"finished","md5_checksum":null}', '//c.vidly.io/277d3db517ab3c4ca7d2eca26df2cfe4.mp4', 'finished', '//c.vidly.io/0_213.png', 'gdfggg', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/AegspCOSW6rhmXBU4SFV', '804ny', '2015-09-28', '2015-09-28 10:50:52'),
(214, '', 'paqa', 'locla', '', '189779317', '{"id":189750261,"format":"avi","frame_rate":13,"duration_in_ms":116000,"audio_sample_rate":null,"audio_bitrate_in_kbps":null,"audio_codec":null,"height":900,"width":1600,"file_size_in_bytes":2241024,"video_codec":"mpeg4","total_bitrate_in_kbps":null,"channels":null,"video_bitrate_in_kbps":151,"state":"finished","md5_checksum":null}', '//c.vidly.io/3bfb6231c953f1cbe912775b7952a1ea.mp4', 'finished', '//c.vidly.io/0_214.png', 'local uiploadq', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/shyWwJx2TpSKjji4Uss7', 'x35oqzadcxr', '2015-09-28', '2015-09-28 05:13:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `IsDelete` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL,
  `is_nsfw` tinyint(1) NOT NULL DEFAULT '0',
  `isReddit` tinyint(1) NOT NULL DEFAULT '0',
  `makeAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `random_no` varchar(255) NOT NULL,
  `created` date NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=152 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `IsDelete`, `isActive`, `is_nsfw`, `isReddit`, `makeAdmin`, `random_no`, `created`, `updatedAt`) VALUES
(43, 'shweta21', 'shwetas@mastersoftwaresolutions.com', '', 'user', 1, 1, 1, 0, 0, '', '2015-09-07', '2015-09-28 11:50:49'),
(78, 'mssavnishkumar', '', '', 'user', 0, 1, 0, 1, 0, '', '2015-09-03', '2015-09-28 12:28:33'),
(101, 'shweta', 'shwetasaluja@mastersoftwaresolutions.com', '', 'user', 0, 1, 0, 0, 0, 'bV2K2', '2015-09-07', '0000-00-00 00:00:00'),
(103, 'shivi', 'shivi@gmail.com', '', 'user', 0, 0, 0, 0, 0, 'FNzFx', '2015-09-07', '0000-00-00 00:00:00'),
(107, 'Vikas', 'vikasyadav@mastersoftwaresolutions.com', '', 'user', 0, 1, 0, 0, 0, '01jKw', '2015-09-07', '2015-09-09 12:59:30'),
(125, 'DontFindMe_', '', '', 'user', 0, 1, 0, 1, 0, '', '0000-00-00', '2015-09-10 12:59:23'),
(126, 'Jordan', 'jordansimps@me.com', '', 'user', 0, 0, 0, 0, 0, 'GVJph', '2015-09-10', '2015-09-10 04:21:07'),
(128, 'asssss', 'dsfs@gmail.com', '', 'user', 0, 0, 0, 0, 0, 'CTXRR', '2015-09-10', '2015-09-10 13:02:02'),
(129, 'asdfgh', 'dd@gmail.com', '', 'user', 0, 0, 0, 0, 0, '2AFs3', '2015-09-10', '2015-09-10 13:07:22'),
(140, 'gsg123', 'sdf@gmail.com', '', 'user', 0, 0, 0, 0, 0, '7u4Vo', '2015-09-15', '2015-09-15 06:26:27'),
(141, '123456', 'gdc@gmail.com', '', 'user', 0, 1, 1, 0, 0, 'CHoAh', '2015-09-15', '2015-09-17 13:36:16'),
(142, 'shailendra', 'shailendra@mastersoftwaresolutions.com', '', 'user', 0, 1, 0, 0, 0, 'bQW4q', '2015-09-21', '2015-09-21 10:50:02'),
(150, 'megha31', 'meghathareja@mastersoftwaresolutions.com', '', 'admin', 0, 1, 0, 0, 0, 'CDuMu', '2015-09-21', '2015-09-23 12:11:46'),
(151, 'mssavnishkumar', 'avnishkumar@mastersoftwaresolutions.com', '', 'user', 0, 1, 0, 0, 0, 'HsvMN', '2015-09-22', '2015-09-22 13:35:57');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE IF NOT EXISTS `views` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `view_count` int(255) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `video_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=88 ;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `view_count`, `ip`, `video_id`) VALUES
(74, 1, '127.0.0.1', 'rtrt'),
(75, 1, '127.0.0.1', 'yhyf'),
(76, 1, '127.0.0.1', 'gfgd'),
(77, 1, '127.0.0.1', 'fgff'),
(78, 1, '192.168.0.1', 'mmmo'),
(79, 1, '192.168.0.1', 'iyey'),
(80, 1, '127.0.0.1', 'gggg'),
(81, 1, '127.0.0.1', 'gggg'),
(82, 1, '127.0.0.1', 'iyey'),
(83, 1, '192.168.0.1', 'ghff'),
(84, 1, '127.0.0.1', 'ghff'),
(85, 1, '192.168.0.1', 'yhyf'),
(86, 1, '192.168.0.1', 'paqa'),
(87, 1, '192.168.0.1', 'fgff');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
