-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 02, 2015 at 07:13 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.12

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
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `videoID` int(11) NOT NULL,
  `comments` text NOT NULL,
  `childID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `videoID`, `comments`, `childID`, `userID`, `createdAt`, `updatedAt`) VALUES
(1, 218, 'vsdds', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:00:29'),
(2, 218, 'bfbgd', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:01:33'),
(3, 218, 'fdggd', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:03:32'),
(4, 218, 'fbdff', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:10:48'),
(5, 218, 'dgdfg', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:35:20'),
(6, 218, 'vdfvds', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:39:40'),
(7, 218, 'vdfvds', 0, 166, '0000-00-00 00:00:00', '2015-10-02 13:40:53');

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
  `isDelete` tinyint(1) NOT NULL DEFAULT '0',
  `input_file` varchar(255) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `submitted_at` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=246 ;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `userId`, `v_id`, `keywords`, `mediaId`, `zencoder_id`, `input`, `outputs`, `state`, `thumbnail`, `description`, `isPrivate`, `nsfw`, `Active`, `isDelete`, `input_file`, `channel`, `submitted_at`, `created`) VALUES
(218, '', 'sccs', 'dsfsd', '', '190082277', '{"id":190053221,"format":"mpeg4","frame_rate":15,"duration_in_ms":24000,"audio_sample_rate":null,"audio_bitrate_in_kbps":null,"audio_codec":null,"height":768,"width":1366,"file_size_in_bytes":7258194,"video_codec":"h264","total_bitrate_in_kbps":null,"channels":null,"video_bitrate_in_kbps":2417,"state":"finished","md5_checksum":null}', '//c.vidly.io/12efea0bbf1a1c24012ede8e795966d9.mp4', 'finished', '//c.vidly.io/0_218.png', 'dfcdfcds', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/Z9VNmGEKTuyJJqMP2FIj', 'xpfkp', '2015-09-29', '2015-09-30 11:48:17'),
(219, '43', 'sgvv', 'dfsd', '', '190084734', '{"id":190055678,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/5ed4d94d70cb715c14a60ba5ef2c3738.mp4', 'finished', '//c.vidly.io/0_219.png', 'vgsdvgs', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/mtyGB5uTcKCJfVGynUQo', 'xsfvod', '2015-09-29', '2015-09-30 11:48:19'),
(220, '78', 'ddff', 'dfds', '', '190087924', '{"id":190058868,"format":"mpeg4","frame_rate":25,"duration_in_ms":29568,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":5253880,"video_codec":"h264","total_bitrate_in_kbps":1416,"channels":"6","video_bitrate_in_kbps":1032,"state":"finished","md5_checksum":null}', '//c.vidly.io/dabda3cc6b28f10250a55eed310b8c82.mp4', 'finished', '//c.vidly.io/0_220.png', 'fdfdf', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/DT0M8xraQwzA9H48M2cg', 'xsfvod', '2015-09-29', '2015-09-30 11:48:21'),
(221, '78', 'gggt', 'ggtert', '', '190090013', '{"id":190060957,"format":"mpeg4","frame_rate":25,"duration_in_ms":62315,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":10498677,"video_codec":"h264","total_bitrate_in_kbps":1343,"channels":"6","video_bitrate_in_kbps":959,"state":"finished","md5_checksum":null}', '//c.vidly.io/11ef5432dfa98b187d9d3d48c3e7ba3e.mp4', 'finished', '//c.vidly.io/0_221.png', 'fggretg', 0, 1, 1, 0, 'https://www.filepicker.io/api/file/OvXyGlXDRMaqcZ2ovxew', 'xsfvod', '2015-09-29', '2015-09-30 12:00:25'),
(222, '', 'cgfc', 'fgfgr', '', '190090181', '{"id":190061125,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/c206a21027f5b02eb371b34310aa47ff.mp4', 'finished', '//c.vidly.io/0_222.png', 'cvgfdg', 0, 0, 1, 1, 'https://www.filepicker.io/api/file/DfiLJ1XQnWhbROMoCgPQ', 'xsfvod', '2015-09-29', '2015-10-01 11:29:00'),
(226, '', 'fdsd', 'dsss', '', '190096089', '{"id":190067033,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/a4c8aecbfdc2c7c74cf43627da38f00b.mp4', 'finished', '//c.vidly.io/0_226.png', 'fdsfs', 0, 0, 1, 1, 'https://www.filepicker.io/api/file/wU0LhmBMTHHdETSNEXVS', 'xsfvod', '2015-09-29', '2015-09-30 11:48:28'),
(228, '', 'nsss', '', '', '190098568', '{"id":190069512,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/91b3baf01017b97eca19aead1ecfd457.mp4', 'finished', '//c.vidly.io/0_228.png', 'nssfwww', 0, 1, 1, 0, 'https://www.filepicker.io/api/file/Bwo2P59DSkuTX6KdepUR', 'xsfvod', '2015-09-29', '2015-09-30 12:00:28'),
(229, '', 'whnw', '', '', '190099416', '{"id":190070359,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/e3740ebd6becb5df875d0e2813de36b7.mp4', 'finished', '//c.vidly.io/0_229.png', 'fgdshfnsfwww', 0, 1, 1, 0, 'https://www.filepicker.io/api/file/p9dWppFDQTiSTZ5MpUGG', 'xsfvod', '2015-09-29', '2015-09-30 12:00:30'),
(230, '', 'fgvd', 'dsfd', '', '190329520', '{"id":190300464,"format":"asf","frame_rate":29.97,"duration_in_ms":30093,"audio_sample_rate":44100,"audio_bitrate_in_kbps":192,"audio_codec":"wmav2","height":720,"width":1280,"file_size_in_bytes":26246026,"video_codec":"vc1","total_bitrate_in_kbps":6134,"channels":"2","video_bitrate_in_kbps":5942,"state":"finished","md5_checksum":null}', '//c.vidly.io/d0691ec74ec8aefcba498d5bb8c9ac76.mp4', 'finished', '//c.vidly.io/0_230.png', 'fvdfgd', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/wLNNGS7JQSuTDViX4qgQ', 'xsfvod', '2015-09-30', '2015-09-30 11:48:36'),
(231, '', 'hfff', 'fdgd', '', '190329754', '{"id":190300698,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/b73f2d2c4d31b83df2d35250d8d32f35.mp4', 'finished', '//c.vidly.io/0_231.png', 'fghdf', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/DmJmPdKBRCy4awG9i2y3', 'xsfvod', '2015-09-30', '2015-09-30 11:48:42'),
(232, '', 'fdgd', '', '', '190329820', '{"id":190300764,"format":"mpeg4","frame_rate":25,"duration_in_ms":29568,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":720,"width":1280,"file_size_in_bytes":5253880,"video_codec":"h264","total_bitrate_in_kbps":1416,"channels":"6","video_bitrate_in_kbps":1032,"state":"finished","md5_checksum":null}', '//c.vidly.io/72fe2ab7cb43be3e3e5ea29b0f82955a.mp4', 'finished', '//c.vidly.io/0_232.png', 'fddgfg', 0, 0, 1, 1, 'https://www.filepicker.io/api/file/EDr2DZd1RxifAXIVIYF4', 'xsfvod', '2015-09-30', '2015-09-30 12:38:45'),
(233, '', 'gffg', 'gdsfg', '', '190334259', '{"id":190305203,"format":"mpeg4","frame_rate":15,"duration_in_ms":24000,"audio_sample_rate":null,"audio_bitrate_in_kbps":null,"audio_codec":null,"height":768,"width":1366,"file_size_in_bytes":7258194,"video_codec":"h264","total_bitrate_in_kbps":null,"channels":null,"video_bitrate_in_kbps":2417,"state":"finished","md5_checksum":null}', '//c.vidly.io/97a442790efaf9c5f5d4b0f3c6519344.mp4', 'finished', '//c.vidly.io/0_233.png', 'dfgfdg', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/OIU3S416RDapaphNusAk', 'xsfvod', '2015-09-30', '2015-09-30 11:49:28'),
(234, '', 'dfcc', 'fcds', '', '190334392', '{"id":190305336,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/ea76fa6ca3f90eabeaf1ffca056b8a8d.mp4', 'finished', '//c.vidly.io/0_234.png', 'dfcdfc', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/2Wh2ViCQXuQqhC16JGH6', 'xsfvod', '2015-09-30', '2015-09-30 05:39:28'),
(235, '', 'dgdd', 'gfdg', '', '190405051', '{"id":190375995,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/314863073eee288ad1e79be193a4b33c.mp4', 'finished', '//c.vidly.io/0_235.png', 'dfggdf dfgdfg', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/RwLjAN3Syawpd24W7sVa', 'xsfvod', '2015-09-30', '2015-09-30 13:02:10'),
(238, '', 'dsss', '', '', '190710698', '{"id":190681642,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/4ebe88baeadc648096c4f10ca0feb49e.mp4', 'finished', '//c.vidly.io/0_238.png', 'sdsdads', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/LklEWruxRdOM0jNurgnv', 'xsfvod', '2015-10-01', '2015-10-01 12:14:25'),
(239, '', 'dvvx', '', '', '190710883', '{"id":190681827,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/6e232b004228d4d28f521156028f0068.mp4', 'finished', '//c.vidly.io/0_239.png', 'xfvdgvdprivate', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/ugLePlaNTSSqFZdT4i17', 'xsfvod', '2015-10-01', '2015-10-01 12:15:26'),
(240, '', 'tfeg', '', '', '190711278', '{"id":190682222,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/2a76be2b2889f08e5d9408eb2fab2c0c.mp4', 'finished', '//c.vidly.io/0_240.png', 'fgdggisprivate', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/3GqwH8MQ5m36JjIlQgHG', 'xsfvod', '2015-10-01', '2015-10-01 12:17:19'),
(241, '', 'fdfv', '', '', '190712731', '{"id":190683675,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/e4a2244db042f60884f8fdbc3efdcb53.mp4', 'finished', '//c.vidly.io/0_241.png', 'vbdfbgdf', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/Iq0uN5BuSDieWOOKvE9g', 'xsfvod', '2015-10-01', '2015-10-01 12:25:28'),
(242, '', 'dsff', '', '', '190713080', '{"id":190684024,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/c765e59219a747ffcbf08bb2f96d738f.mp4', 'finished', '//c.vidly.io/0_242.png', 'dsfsdf', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/pcJkzs8NTby23ZHltsTm', 'xsfvod', '2015-10-01', '2015-10-01 12:27:12'),
(243, '167', 'prsi', '', '', '190715059', '{"id":190686003,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/800c5355140adb8eee426bee19f90df6.mp4', 'finished', '//c.vidly.io/0_243.png', 'shailendraIsprivate', 1, 0, 1, 0, 'https://www.filepicker.io/api/file/3mc9pOz6ROCuIYqm4UEo', 'xsfvod', '2015-10-01', '2015-10-01 12:37:44'),
(244, '', 'dvdd', '', '', '190979883', '{"id":190950827,"format":"mpeg4","frame_rate":25,"duration_in_ms":15190,"audio_sample_rate":48000,"audio_bitrate_in_kbps":384,"audio_codec":"aac","height":368,"width":640,"file_size_in_bytes":2107114,"video_codec":"mpeg4","total_bitrate_in_kbps":1107,"channels":"6","video_bitrate_in_kbps":723,"state":"finished","md5_checksum":null}', '//c.vidly.io/d4081d02e53ab233bf0ab47e3ee67cc4.mp4', 'finished', '//c.vidly.io/0_244.png', 'vdfvd', 0, 0, 1, 0, 'https://www.filepicker.io/api/file/lWGIMKt7RhWkZkZ2mrtZ', 'xsfvod', '2015-10-02', '2015-10-02 07:57:16');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=170 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `IsDelete`, `isActive`, `is_nsfw`, `isReddit`, `makeAdmin`, `random_no`, `created`, `updatedAt`) VALUES
(43, 'shweta21', 'shwetas@mastersoftwaresolutions.com', '3346319e7aba1929137a976bb9abfd06', 'user', 1, 1, 1, 0, 0, '', '2015-09-07', '2015-10-01 04:44:04'),
(78, 'mssavnishkumar', '', '', 'user', 0, 1, 1, 1, 0, '', '2015-09-03', '2015-09-30 12:38:26'),
(101, 'shweta', 'shwetasaluja@mastersoftwaresolutions.com', '3346319e7aba1929137a976bb9abfd06', 'user', 1, 1, 0, 0, 0, 'bV2K2', '2015-09-07', '2015-10-01 04:47:38'),
(103, 'shivi', 'shivi@gmail.com', '2ad1ebcb3dc247474db9c8f8fecf0c55', 'user', 1, 0, 0, 0, 0, 'FNzFx', '2015-09-07', '2015-09-29 13:02:19'),
(107, 'Vikas', 'vikasyadav@mastersoftwaresolutions.com', 'e10adc3949ba59abbe56e057f20f883e', 'user', 1, 1, 0, 0, 0, '01jKw', '2015-09-07', '2015-09-30 06:06:52'),
(125, 'DontFindMe_', '', '', 'user', 0, 1, 0, 1, 0, '', '0000-00-00', '2015-09-10 12:59:23'),
(126, 'Jordan', 'jordansimps@me.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'user', 0, 0, 0, 0, 0, 'GVJph', '2015-09-10', '2015-09-30 12:39:31'),
(150, 'megha31', 'meghathareja@mastersoftwaresolutions.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin', 0, 1, 0, 0, 0, 'CDuMu', '2015-09-21', '2015-10-01 13:23:10'),
(151, 'mssavnishkumar', 'avnishkumar@mastersoftwaresolutions.com', '61cc0e405f4b518d264c089ac8b642ef', 'user', 0, 1, 0, 0, 0, 'HsvMN', '2015-09-22', '2015-09-22 13:35:57'),
(153, 'Admin', 'youremailid@email.com', '8d7a5ff0\r\n6950ef379391f08c31a8367f', 'admin', 0, 1, 1, 0, 0, 'n1HzO', '0000-00-00', '2015-09-30 11:31:53'),
(166, 'shweta21', 'shwetasaluja@mastersoftwaresolutions.com', '61cc0e405f4b518d264c089ac8b642ef', 'user', 0, 1, 0, 0, 0, 'DXNpE', '2015-10-01', '2015-10-01 09:49:46'),
(167, 'shailendra', 'shailendra@mastersoftwaresolutions.com', '61cc0e405f4b518d264c089ac8b642ef', 'user', 0, 1, 0, 0, 0, 'ztIE2', '2015-10-01', '2015-10-01 12:46:31');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=98 ;

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
(87, 1, '192.168.0.1', 'fgff'),
(88, 1, '192.168.0.1', 'sccs'),
(89, 1, '192.168.0.1', 'sgvv'),
(90, 1, '192.168.0.1', 'gggt'),
(91, 1, '192.168.0.1', 'dgdd'),
(92, 1, '192.168.0.1', 'cgfc'),
(93, 1, '127.0.0.1', 'sccs'),
(94, 1, '127.0.0.1', 'sgvv'),
(95, 1, '192.168.0.1', 'dvdd'),
(96, 1, '192.168.0.1', 'hggh'),
(97, 1, '192.168.0.1', 'fgvd');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
