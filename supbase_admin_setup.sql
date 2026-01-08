-- Enable pgcrypto for password hashing
create extension if not exists pgcrypto;

DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Check if user exists
  SELECT id INTO user_id FROM auth.users WHERE email = 'admin@gmail.com';

  IF user_id IS NOT NULL THEN
    -- Update existing user
    UPDATE auth.users
    SET encrypted_password = crypt('admin@123', gen_salt('bf')),
        email_confirmed_at = now(),
        updated_at = now(),
        role = 'authenticated',
        aud = 'authenticated'
    WHERE id = user_id;
  ELSE
    -- Insert new user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@gmail.com',
      crypt('admin@123', gen_salt('bf')),
      now(), -- This sets the user as CONFIRMED immediately
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- Verify the result
SELECT email, email_confirmed_at, role FROM auth.users WHERE email = 'admin@gmail.com';
