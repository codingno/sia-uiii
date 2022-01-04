/* Replace with your SQL commands */
-- Struktur dari tabel `religion`
--

CREATE TABLE IF NOT EXISTS `religion` (
  `id` int(11) NOT NULL,
  `keterangan` varchar(15) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data untuk tabel `religion`
--

INSERT INTO `religion` (`id`, `keterangan`) VALUES
(1, 'Islam'),
(2, 'Kristen'),
(3, 'Katolik'),
(4, 'Budha'),
(5, 'Hindu'),
(6, 'Kepercayaan');
--
-- Struktur dari tabel `akademik_jadwal_kuliah`
--

CREATE TABLE IF NOT EXISTS `academic_schedule` (
  `id` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `departement_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `start_time` varchar(9) NOT NULL,
  `end_time` varchar(9) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;
-- add column religion
ALTER TABLE `user_info` 
ADD COLUMN `religion` VARCHAR(15) NULL AFTER `gender`;

CREATE TABLE IF NOT EXISTS `academic_krs` (
  `id` int(11) NOT NULL,
  `student_number` varchar(10) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `semester` int(11) NOT NULL COMMENT 'semester mahasiswa waktu pengambilan krs'
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=latin1;

--students table
ALTER TABLE `students` 
ADD COLUMN `mother_name` VARCHAR(100) NULL AFTER `updatedAt`,
ADD COLUMN `father_name` VARCHAR(100) NULL AFTER `mother_name`,
ADD COLUMN `father_income` INT(11) NULL AFTER `father_name`,
ADD COLUMN `mother_income` INT(11) NULL AFTER `father_income`,
ADD COLUMN `school_name` VARCHAR(50) NULL AFTER `mother_income`,
ADD COLUMN `school_telp` VARCHAR(12) NULL AFTER `school_name`,
ADD COLUMN `school_address` VARCHAR(45) NULL AFTER `school_telp`,
ADD COLUMN `school_departement` VARCHAR(80) NULL AFTER `school_address`,
ADD COLUMN `schoole_end` INT(4) NULL AFTER `school_departement`,
ADD COLUMN `campus_name` VARCHAR(50) NULL AFTER `school_end`,
ADD COLUMN `campus_telp` VARCHAR(12) NULL AFTER `campus_name`,
ADD COLUMN `campus_address` VARCHAR(45) NULL AFTER `campus_telp`,
ADD COLUMN `campus_departement` VARCHAR(80) NULL AFTER `campus_address`,
ADD COLUMN `campus_end` INT(4) NULL AFTER `campus_departement`,
ADD COLUMN `institution_name` VARCHAR(50) NULL AFTER `school_end`,
ADD COLUMN `institution_telp` VARCHAR(12) NULL AFTER `institutioncampus_name`,
ADD COLUMN `institution_address` VARCHAR(45) NULL AFTER `institutioncampus_telp`,
ADD COLUMN `institution_start` INT(4)) NULL AFTER `institution_address`,
ADD COLUMN `institution_end` INT(4) NULL AFTER `institution_start`,
ADD COLUMN `semester_active` INT(11) NULL AFTER `institution_end`;

--teacher marriage_status
ALTER TABLE `teachers` 
ADD COLUMN `marriage_status` ENUM('MARRY', 'SINGLE') NULL AFTER `departement_id`;