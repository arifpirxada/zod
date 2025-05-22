import { z } from "zod";

// Primitive types
z.string();
z.number();
z.bigint();
z.boolean();
z.symbol();
z.undefined();
z.null();

// Coercion
z.coerce.string();    // String(input)
z.coerce.number();    // Number(input)
z.coerce.boolean();   // Boolean(input)
z.coerce.bigint();    // BigInt(input)

// There are also Literals


// --------------------
// Strings methods

z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().regex(/^[a-z]+$/);
z.string().startsWith("aaa");
z.string().endsWith("zzz");
z.string().includes("---");
// z.string().uppercase();
// z.string().lowercase();

// Perform transformations

z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase

// Validate common string formats

// z.email();
// z.uuid();
// z.url();
// z.emoji();         // validates a single emoji character
// z.base64();
// z.base64url();
// z.nanoid();
// z.cuid();
// z.cuid2();
// z.ulid();
// z.ipv4();
// z.ipv6();
// z.cidrv4();        // ipv4 CIDR block
// z.cidrv6();        // ipv6 CIDR block
// z.iso.date();
// z.iso.time();
// z.iso.datetime();
// z.iso.duration();


// --------------------
// Numbers

z.number().gt(5);
z.number().gte(5);                     // alias .min(5)
z.number().lt(5);
z.number().lte(5);                     // alias .max(5)
z.number().positive();
z.number().nonnegative();
z.number().negative();
z.number().nonpositive();
z.number().multipleOf(5);              // alias .step(5)

z.nan().parse(NaN);              // ✅
z.nan().parse("anything else");  // ❌


// Integers

// z.int();     // restricts to safe integer range
// z.int32();   // restrict to int32 range



// ---------------
// Enums

const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);

FishEnum.parse("Salmon"); // => "Salmon"
FishEnum.parse("Swordfish"); // => ❌

// There are other ways to write enums in zod check out on docs


// Optionals, Nullables, Nullish

z.optional(z.literal("yoda")); // or z.literal("yoda").optional()

z.nullable(z.literal("yoda")); // or z.literal("yoda").nullable()

// const nullishYoda = z.nullish(z.literal("yoda"));


// -------------------------
// Objects

// all properties are required by default
const Person = z.object({
    name: z.string(),
    age: z.number(),
});

type Person = z.infer<typeof Person>;
// => { name: string; age: number; }

// There are many methods for objects - strictObject, looseObject check them out


// ---------------
// Arrays

const stringArray = z.array(z.string()); // or z.string().array()

z.array(z.string()).min(5); // must contain 5 or more items
z.array(z.string()).max(5); // must contain 5 or fewer items
z.array(z.string()).length(5); // must contain 5 items exactly

// Tuples

const MyTuple = z.tuple([
  z.string(),
  z.number(),
  z.boolean()
]);
 
type MyTuple = z.infer<typeof MyTuple>;
// [string, number, boolean]

// Unions

const stringOrNumber = z.union([z.string(), z.number()]);
// string | number
 
stringOrNumber.parse("foo"); // passes
stringOrNumber.parse(14); // passes

// Discriminated unions

type MyResult =
  | { status: "success"; data: string }
  | { status: "failed"; error: string };
 
function handleResult(result: MyResult){
  if(result.status === "success"){
    result.data; // string
  } else {
    result.error; // string
  }
}

const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.string() }),
]);

// -------------
// There are also other: Intersections, Records, Maps, Sets, Promises, Instanceof 
// -------------

// Refinements: Perform custom validation that Zod doesn't provide a native API for.

const myString = z.string().refine((val) => val.length <= 255);

// Customise message

// const myStringCustomisedMess = z.string().refine((val) => val.length > 8, { 
//   error: "Too short!" 
// });

// There are also other things check them out