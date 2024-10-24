export default {
    dialect: "postgresql",
    schema: "./src/utils/db/schema.ts",
    out: "./drizzle",
  
    dbCredentials: {
      url: "postgresql://neondb_owner:Y80cbnZItOJM@ep-little-snowflake-a1ehdbdz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
      connectionString:
        "postgresql://neondb_owner:Y80cbnZItOJM@ep-little-snowflake-a1ehdbdz.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    },
  };