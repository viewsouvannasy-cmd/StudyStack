// library
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { sql } from "../database.js";

// helper function
import { getEnv } from "../../utils/getEnv.js";
import { generateUniqueUsername } from "../../utils/generate.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      callbackURL: `${getEnv("SERVER_HOST")}/api/oauth/google/callback`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: unknown, user?: any) => void,
    ) => {
      try {
        const email = profile.emails?.[0]?.value ?? "";
        if (!email) {
          return done(new Error("Google profile did not provide an email"));
        }

        const userData = {
          id: profile.id,
          name: profile.displayName,
          email,
          avatarUrl: profile.photos?.[0]?.value ?? "",
        };

        const [oldUser] = await sql`
        SELECT 
        *
        From users 
        WHERE user_email = ${userData.email}
        `;
        if (oldUser) {
          if (!oldUser.provider || !oldUser.profile_url) {
            await sql`
            UPDATE users
            SET provider = 'google',
            profile_url = ${userData.avatarUrl}
            WHERE user_id = ${oldUser.user_id}
            `;
          }

          return done(null, oldUser);
        }

        let uniqueName = userData.name;

        // check duplicate name
        const isDuplicatrName = await sql`
        SELECT 
        * 
        FROM users 
        WHERE user_name = ${uniqueName}
        `;
        if (isDuplicatrName.length > 0) {
          // generate unqiue name
          uniqueName = await generateUniqueUsername(uniqueName);
        }

        const [newUser] = await sql`
        INSERT INTO users(user_name, user_email, provider , profile_url)
        VALUES (
        ${uniqueName},
        ${userData.email},
        'google',
        ${userData.avatarUrl}
        )
        RETURNING *
        `;

        return done(null, newUser);
      } catch (error) {
        return done(error, undefined);
      }
    },
  ),
);

export default passport;
