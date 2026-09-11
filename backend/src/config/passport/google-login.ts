import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { getEnv } from "../../utils/getEnv.js";
import { sql } from "../database.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      callbackURL: "/api/oauth/google/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: unknown, user?: any) => void,
    ) => {
      try {
        const userData = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value ?? "",
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

        const [newUser] = await sql`
        INSERT INTO users(user_name, user_email, provider , profile_url)
        VALUES (
        ${userData.name},
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
