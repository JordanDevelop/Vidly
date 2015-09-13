-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 03, 2015 at 11:50 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=62 ;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `count`, `dislike_count`, `video_id`, `user_id`) VALUES
(58, 1, 0, 51, 74),
(59, 1, 0, 52, 74),
(60, 1, 0, 53, 74),
(61, 1, 0, 54, 74);

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE IF NOT EXISTS `uploads` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `userId`, `mediaId`, `zencoder_id`, `input`, `outputs`, `state`, `thumbnail`, `description`, `isPrivate`, `input_file`, `channel`, `submitted_at`, `created`) VALUES
(51, '43', '', '183509772', '{"id":183480716,"format":"mpeg4","frame_rate":25,"duration_in_ms":5312,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":1055736,"video_codec":"h264","total_bitrate_in_kbps":1589,"channels":"6","video_bitrate_in_kbps":1205,"state":"finished","md5_checksum":null}', '{"MP4":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/07f795e85a0b27c840ca79a45fb8a4ba.mp4","format":"mpeg4","width":1280,"height":720},"WebM":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/55aa6f120fa7d9839288ac9ab7dfbc28.webm","format":"webm","width":1280,"height":720}}', 'finished', '{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/0_51.png","size":"1280x720"}', 'rrrrrrrrr', 0, 'https://www.filepicker.io/api/file/rQvsezSbOEPIFPz9XPgK', 'oc733l', '2015-09-02', '2015-09-02 06:28:33'),
(52, '75', '', '183736240', '{"id":183707184,"format":"mpeg4","frame_rate":25,"duration_in_ms":15318,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":480,"width":640,"file_size_in_bytes":2097619,"video_codec":"h264","total_bitrate_in_kbps":1093,"channels":"6","video_bitrate_in_kbps":709,"state":"finished","md5_checksum":null}', '{"MP4":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/b0ab97bb71d5bd56dfac81bd3e736b4e.mp4","format":"mpeg4","width":640,"height":480},"WebM":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/60d0378731826fbbae0af0682a0f5ea4.webm","format":"webm","width":640,"height":480}}', 'finished', '{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/0_52.png","size":"640x480"}', 'shail added video..', 0, 'https://www.filepicker.io/api/file/a8r2FS8OTzuGiAaYVrrH', 'oc733l', '2015-09-03', '2015-09-03 05:30:01'),
(53, '43', '', '183736914', '{"id":183707858,"format":"mpeg4","frame_rate":25,"duration_in_ms":29568,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":5253880,"video_codec":"h264","total_bitrate_in_kbps":1416,"channels":"6","video_bitrate_in_kbps":1032,"state":"finished","md5_checksum":null}', '{"MP4":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/8d60daa4bb69c0973a0ef1a06240d12a.mp4","format":"mpeg4","width":1280,"height":720},"WebM":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/5afe5f8cd119d7026ab107876a646ef8.webm","format":"webm","width":1280,"height":720}}', 'finished', '{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/0_53.png","size":"1280x720"}', 'shweta chk private scope', 1, 'https://www.filepicker.io/api/file/EZ9J57aoQAK4ON56tkv7', 'oc733l', '2015-09-03', '2015-09-03 05:36:37'),
(54, '', '', '183741694', '{"id":183712638,"format":"asf","frame_rate":29.97,"duration_in_ms":30093,"audio_sample_rate":44100,"audio_bitrate_in_kbps":192,"audio_codec":"wmav2","height":720,"width":1280,"file_size_in_bytes":26246026,"video_codec":"vc1","total_bitrate_in_kbps":6134,"channels":"2","video_bitrate_in_kbps":5942,"state":"finished","md5_checksum":null}', '{"MP4":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/67f07035e57d051662a2cea1d11bb255.mp4","format":"mpeg4","width":1280,"height":720},"WebM":{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/355cbe4158b1cb168fb8036cc0d5f629.webm","format":"webm","width":1280,"height":720}}', 'finished', '{"url":"http://vidly-videos-dev.s3.amazonaws.com/zensockets/0_54.png","size":"1280x720"}', 'public user', 0, 'https://www.filepicker.io/api/file/AYNEhXXWRGKkGD275ROs', 'oc733l', '2015-09-03', '2015-09-03 06:19:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastUpdated` date NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `random_no` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=77 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `lastUpdated`, `isActive`, `random_no`, `created`) VALUES
(43, 'shweta21', 'shwetasaluja@mastersoftwaresolutions.com', '3346319e7aba1929137a976bb9abfd06', '0000-00-00', 1, '', '2015-08-28 10:44:45'),
(52, 'psachdeva', 'mss.parveensachdeva@gmail.com', '61cc0e405f4b518d264c089ac8b642ef', '0000-00-00', 1, '', '2015-08-31 09:52:10'),
(74, 'megha', 'meghathareja@mastersoftwaresolutions.com', '61cc0e405f4b518d264c089ac8b642ef', '0000-00-00', 1, 'GoYBz', '2015-09-01 05:04:34'),
(75, 'sd', 'dggf@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '0000-00-00', 0, 'mWeJp', '2015-09-03 09:21:26'),
(76, 'vikas yadav', 'mss.vikasyadav@gmail.com', '61cc0e405f4b518d264c089ac8b642ef', '0000-00-00', 0, 'qpjJ9', '2015-09-03 09:32:31');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE IF NOT EXISTS `views` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `view_count` int(255) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `video_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `view_count`, `ip`, `video_id`) VALUES
(5, 1, '127.0.0.1', 0),
(6, 1, '192.168.0.138', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
