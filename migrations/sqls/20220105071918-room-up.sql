/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS `days` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NULL,
  `nama` varchar(15) NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

--
-- Dumping data untuk tabel `app_hari`
--

INSERT INTO `days` (`id`, `name`, `nama`) VALUES
(0, 'not set', ''),
(1, 'monday', 'senin'),
(2, 'tuesday', 'selasa'),
(3, 'wednesday', 'rabu'),
(4, 'thursday', 'kamis'),
(5, 'friday', 'jumat'),
(6, 'saturday', 'sabtu'),
(7, 'monday', 'minggu');


CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NULL,
  `capacity` int(11) NULL,
  `description` varchar(100) NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

INSERT INTO `rooms` (`id`, `name`, `capacity`, `description`) VALUES
(0, 'not set', 0, ''),
(1, 'L1.R06',  25, ''),
(2, 'L1.R05', 25, ''),
(3, 'L1.R02', 60, ''),
(4, 'L1.R07', 25, ''),
(5, 'L1.R08', 50, ''),
(6, 'L1.R09', 25, '');

