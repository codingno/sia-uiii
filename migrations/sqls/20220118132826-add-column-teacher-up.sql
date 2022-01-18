/* Replace with your SQL commands */
ALTER TABLE `faculties` 
ADD COLUMN `teacher_id` INT(11) NULL AFTER `code`
Add COLUMN `status` ENUM('ACTIVE', 'NOT ACTIVE') DEFAULT 'ACTIVE' NULL AFTER `accreditation`;

ALTER TABLE `departements` 
ADD COLUMN `teacher_id` INT(11) NULL AFTER `code`
Add COLUMN `status` ENUM('ACTIVE', 'NOT ACTIVE') DEFAULT 'ACTIVE' NULL AFTER `accreditation`;