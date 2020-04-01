import { promises as fs } from "fs";

import generateArtifactsDirPath from "../helpers/artifacts-dir";
import { generateCodeFromSchema } from "../helpers/generate-code";
import createReadGeneratedFile, {
  ReadGeneratedFile,
} from "../helpers/read-file";

describe("inputs", () => {
  let outputDirPath: string;
  let readGeneratedFile: ReadGeneratedFile;

  beforeEach(async () => {
    outputDirPath = generateArtifactsDirPath("regression-inputs");
    await fs.mkdir(outputDirPath, { recursive: true });
    readGeneratedFile = createReadGeneratedFile(outputDirPath);
  });

  it("should properly generate input type classes for filtering scalar fields", async () => {
    const schema = /* prisma */ `
      model SampleModel {
        intIdField    Int       @id @default(autoincrement())
        stringField   String
        floatField    Float
        booleanField  Boolean
        dateField     DateTime
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const intFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/IntFilter.ts",
    );
    const stringFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/StringFilter.ts",
    );
    const floatFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/FloatFilter.ts",
    );
    const booleanFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/BooleanFilter.ts",
    );
    const dateTimeFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/DateTimeFilter.ts",
    );

    expect(intFilterTSFile).toMatchSnapshot("IntFilter");
    expect(stringFilterTSFile).toMatchSnapshot("StringFilter");
    expect(floatFilterTSFile).toMatchSnapshot("FloatFilter");
    expect(booleanFilterTSFile).toMatchSnapshot("BooleanFilter");
    expect(dateTimeFilterTSFile).toMatchSnapshot("DateTimeFilter");
  });

  it("should properly generate input type classes for filtering models by fields", async () => {
    const schema = /* prisma */ `
      model SampleModel {
        intIdField    Int       @id @default(autoincrement())
        stringField   String    @unique
        floatField    Float
        booleanField  Boolean
        dateField     DateTime
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const sampleModelWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/SampleModelWhereInput.ts",
    );
    const sampleModelWhereUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/SampleModelWhereUniqueInput.ts",
    );

    expect(sampleModelWhereInputTSFile).toMatchSnapshot(
      "SampleModelWhereInput",
    );
    expect(sampleModelWhereUniqueInputTSFile).toMatchSnapshot(
      "SampleModelWhereUniqueInput",
    );
  });

  it("should properly generate input type classes for filtering models by relation fields", async () => {
    const schema = /* prisma */ `
      model FirstModel {
        idField            Int            @id @default(autoincrement())
        uniqueStringField  String         @unique
        floatField         Float
        secondModelsField  SecondModel[]
      }
      model SecondModel {
        idField            Int           @id @default(autoincrement())
        uniqueStringField  String        @unique
        floatField         Float
        firstModelsField   FirstModel[]
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const firstModelWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/FirstModelWhereInput.ts",
    );
    const firstModelWhereUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/FirstModelWhereUniqueInput.ts",
    );
    const firstModelScalarWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/FirstModelScalarWhereInput.ts",
    );
    const firstModelOrderByInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/FirstModelOrderByInput.ts",
    );

    expect(firstModelWhereInputTSFile).toMatchSnapshot("FirstModelWhereInput");
    expect(firstModelWhereUniqueInputTSFile).toMatchSnapshot(
      "FirstModelWhereUniqueInput",
    );
    expect(firstModelScalarWhereInputTSFile).toMatchSnapshot(
      "FirstModelScalarWhereInput",
    );
    expect(firstModelOrderByInputTSFile).toMatchSnapshot(
      "FirstModelOrderByInput",
    );
  });

  it("should properly generate input type class for filtering by enums values", async () => {
    const schema = /* prisma */ `
      enum Color {
        RED
        GREEN
        BLUE
      }

      model SampleModel {
        idField    Int    @id @default(autoincrement())
        enumField  Color
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const colorEnumFilterTSFile = await readGeneratedFile(
      "/resolvers/inputs/ColorFilter.ts",
    );

    expect(colorEnumFilterTSFile).toMatchSnapshot("ColorFilter");
  });

  it("should properly generate input type classes for model with composite unique index", async () => {
    const schema = /* prisma */ `
      model Movie {
        directorFirstName String
        directorLastName  String
        director          Director @relation(fields: [directorFirstName, directorLastName], references: [firstName, lastName])
        title             String
        rating            Float
      
        @@id([directorFirstName, directorLastName, title])
      }
      
      model Director {
        firstName String
        lastName  String
        age       Int
        movies    Movie[]
      
        @@id([firstName, lastName])
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const directorWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/DirectorWhereInput.ts",
    );
    const directorWhereUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/DirectorWhereUniqueInput.ts",
    );
    const directorOrderByInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/DirectorOrderByInput.ts",
    );
    const directorFirstNameLastNameCompoundUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/FirstNameLastNameCompoundUniqueInput.ts",
    );

    expect(directorWhereInputTSFile).toMatchSnapshot("DirectorWhereInput");
    expect(directorWhereUniqueInputTSFile).toMatchSnapshot(
      "DirectorWhereUniqueInput",
    );
    expect(directorOrderByInputTSFile).toMatchSnapshot("DirectorOrderByInput");
    expect(directorFirstNameLastNameCompoundUniqueInputTSFile).toMatchSnapshot(
      "FirstNameLastNameCompoundUniqueInput",
    );
  });

  it("should properly generate input type classes for model with id keys with relation", async () => {
    const schema = /* prisma */ `
      model Movie {
        directorFirstName String
        directorLastName  String
        director          Director @relation(fields: [directorFirstName, directorLastName], references: [firstName, lastName])
        title             String
        rating            Float
      
        @@id([directorFirstName, directorLastName, title])
      }
      
      model Director {
        firstName String
        lastName  String
        age       Int
        movies    Movie[]
      
        @@id([firstName, lastName])
      }
    `;

    await generateCodeFromSchema(schema, { outputDirPath });
    const movieWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/MovieWhereInput.ts",
    );
    const movieWhereUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/MovieWhereUniqueInput.ts",
    );
    const movieScalarWhereInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/MovieScalarWhereInput.ts",
    );
    const movieOrderByInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/MovieOrderByInput.ts",
    );
    const directorFirstNameDirectorLastNameTitleCompoundUniqueInputTSFile = await readGeneratedFile(
      "/resolvers/inputs/DirectorFirstNameDirectorLastNameTitleCompoundUniqueInput.ts",
    );

    expect(movieWhereInputTSFile).toMatchSnapshot("MovieWhereInput");
    expect(movieWhereUniqueInputTSFile).toMatchSnapshot(
      "MovieWhereUniqueInput",
    );
    expect(movieScalarWhereInputTSFile).toMatchSnapshot(
      "MovieScalarWhereInput",
    );
    expect(movieOrderByInputTSFile).toMatchSnapshot("MovieOrderByInput");
    expect(
      directorFirstNameDirectorLastNameTitleCompoundUniqueInputTSFile,
    ).toMatchSnapshot(
      "DirectorFirstNameDirectorLastNameTitleCompoundUniqueInput",
    );
  });
});
