






------------------------------------------------------------------------------------------------------
-- Table: public.applications

-- DROP TABLE IF EXISTS public.applications;

CREATE TABLE IF NOT EXISTS public.applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    job_seeker_id INTEGER NOT NULL,
    resume TEXT,
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'Submitted',
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    CONSTRAINT fk_job
        FOREIGN KEY (job_id)
        REFERENCES public.jobs (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_job_seeker
        FOREIGN KEY (job_seeker_id)
        REFERENCES public."user" (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
----------------------------------------------------------
-- Table: public.applied_jobs

-- DROP TABLE IF EXISTS public.applied_jobs;

CREATE TABLE IF NOT EXISTS public.applied_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Applied',
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    years_of_experience INTEGER,
    skills TEXT,
    education_level VARCHAR(50),
    resume_link VARCHAR(255),

    CONSTRAINT fk_job
        FOREIGN KEY (job_id)
        REFERENCES public.jobs (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES public."user" (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
-------------------------------------------------------

-- Table: public.companies

-- DROP TABLE IF EXISTS public.companies;

CREATE TABLE IF NOT EXISTS public.companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
--------------------------------------------------------

-- Table: public.jobs

-- DROP TABLE IF EXISTS public.jobs;

CREATE TABLE IF NOT EXISTS public.jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    location VARCHAR(80),
    job_type VARCHAR(50),
    company_name VARCHAR(255),
    recruiter_id INTEGER NOT NULL,
    company_id INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    salary VARCHAR(100),
    job_status VARCHAR(50),
    application_link TEXT,
    company_logo TEXT NOT NULL,

    CONSTRAINT fk_company
        FOREIGN KEY (company_id)
        REFERENCES public.companies (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

    CONSTRAINT fk_recruiter
        FOREIGN KEY (recruiter_id)
        REFERENCES public."user" (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
---------------------------------------------------------
-- Table: public.saved_jobs

-- DROP TABLE IF EXISTS public.saved_jobs;

CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_job_saved
        FOREIGN KEY (job_id)
        REFERENCES public.jobs (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

    CONSTRAINT fk_user_saved
        FOREIGN KEY (user_id)
        REFERENCES public."user" (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
----------------------------------------------------------
-- Table: public.session

-- DROP TABLE IF EXISTS public.session;

CREATE TABLE IF NOT EXISTS public.session (
    sid VARCHAR NOT NULL,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
);

-- Index: Expiration index for automatic session cleanup
-- DROP INDEX IF EXISTS public."IDX_session_expire";

CREATE INDEX IF NOT EXISTS "IDX_session_expire"
    ON public.session (expire ASC NULLS LAST);
-----------------------------------------------------------

-- Table: public.states

-- DROP TABLE IF EXISTS public.states;

CREATE TABLE IF NOT EXISTS public.states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);
-----------------------------------------------------------

-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(1000) NOT NULL,
    inserted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    role VARCHAR(50) NOT NULL DEFAULT 'User'
);











--------- ////////// -----------------------------------------------------------------------///////////

-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";


-------------------------------------------------------
--------------------------------------------------
-- TABLE SCHEMAS:
--1. users table
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

--2. states table
CREATE TABLE states (
  id SERIAL PRIMARY KEY,       
  name VARCHAR(80) NOT NULL     
);

--3.companies table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,                               
  name VARCHAR(100) NOT NULL,                           
  logo_url VARCHAR(255),                                
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()        
);

--4. lobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,                                  
  title VARCHAR(255) NOT NULL,                            
  description TEXT,                                        
  requirements TEXT,                                       
  location VARCHAR(80),                                   
  job_type VARCHAR(50),                                    
  company_name VARCHAR(255),                               
  recruiter_id INT NOT NULL,                               
  company_id INT,                                          
  is_open BOOLEAN DEFAULT TRUE,                            
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),           
  CONSTRAINT fk_recruiter
    FOREIGN KEY (recruiter_id) REFERENCES "user"(id),
  CONSTRAINT fk_company
    FOREIGN KEY (company_id) REFERENCES companies(id)
);


--5. applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,                                  
  job_id INT NOT NULL,                                     
  user_id INT NOT NULL,                                    
  status VARCHAR(50) NOT NULL DEFAULT 'Applied',           
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),           
  years_of_experience INT,                                 
  skills TEXT,                                             
  education_level VARCHAR(50),                             
  resume_link VARCHAR(255),                                
  CONSTRAINT fk_job
    FOREIGN KEY (job_id) REFERENCES jobs(id),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

--6. saved jobs table

CREATE TABLE saved_jobs (
  id SERIAL PRIMARY KEY,                                   
  job_id INT NOT NULL,                                    
  user_id INT NOT NULL,                                    
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),            
  CONSTRAINT fk_job_saved
    FOREIGN KEY (job_id) REFERENCES jobs(id),
  CONSTRAINT fk_user_saved
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);


--7. states table
INSERT INTO states (name) VALUES
('Alabama'),
('Alaska'),
('Arizona'),
('Arkansas'),
('California'),
('Colorado'),
('Connecticut'),
('Delaware'),
('Florida'),
('Georgia'),
('Hawaii'),
('Idaho'),
('Illinois'),
('Indiana'),
('Iowa'),
('Kansas'),
('Kentucky'),
('Louisiana'),
('Maine'),
('Maryland'),
('Massachusetts'),
('Michigan'),
('Minnesota'),
('Mississippi'),
('Missouri'),
('Montana'),
('Nebraska'),
('Nevada'),
('New Hampshire'),
('New Jersey'),
('New Mexico'),
('New York'),
('North Carolina'),
('North Dakota'),
('Ohio'),
('Oklahoma'),
('Oregon'),
('Pennsylvania'),
('Rhode Island'),
('South Carolina'),
('South Dakota'),
('Tennessee'),
('Texas'),
('Utah'),
('Vermont'),
('Virginia'),
('Washington'),
('West Virginia'),
('Wisconsin'),
('Wyoming');



-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123


-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
