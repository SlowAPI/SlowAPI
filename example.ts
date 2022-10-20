interface Ref<T> {

}

function RefTo<T>(obj: any): Ref<T> {
    return {}
}

interface Dict<T> {
    [key: string]: T;
}

enum Type {
    Object,
    Integer,
    String,
    Array,
}

enum In {
    Query,
    Path,
}

// https://swagger.io/specification/#schema-object
interface Schema {
    title?: string;
    type: Type;
    format?: string;
    required?: string[];
    properties?: object;
    items?: Schema | Ref<Schema>;
}

// https://swagger.io/specification/#header-object
interface Header {
    name: string;
    description: string;
    required: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;

    schema: Schema;
    examples?: object[];
}


// https://swagger.io/specification/#parameter-object
interface Parameter extends Header {
    in: In;
}

interface MediaTypeObject {
    schema: Schema | Ref<Schema>,
    examples: object;
}


// https://swagger.io/specification/#response-object
interface Response {
    description: string;
    headers?: Dict<Header | Ref<Header>>;
    content?: Dict<MediaTypeObject>;
    links?: object;
}

// https://swagger.io/specification/#responses-object
interface Responses {
    default?: Response;
    [key: responseCode]: Response;
}

// https://swagger.io/specification/#request-body-object
interface RequestBody {
    description: string;
    content: Dict<MediaTypeObject>;
    required: boolean;
}

// https://swagger.io/specification/#operation-object
interface Operation {
    tags: string[];
    summary: string;
    description: string;
    externalDocs?: object;
    operationID?: string;
    parameters: (Parameter | Ref<Parameter>)[];
    requestBody: RequestBody | Ref<RequestBody>;
    responses: Responses;
    // callbacks: object;
    deprecated?: boolean;
    security: object;
    servers: object;
}

let petQuery : Parameter = {
    name: "Limit",
    in: In.Query,
    description: "How many items to return at one time (max 100)",
    required: false,
    schema: {
        type: Type.Integer,
        format: "int32",
    }
};

let petIdPath : Parameter = {
    name: "petId",
    in: In.Path,
    required: true,
    description: "The id of the pet to retrieve",
    schema: {
        type: Type.String,
    }
}

let Pet: Schema = {
    type: Type.Object,
    required: ["id", "name"],
    properties: {
        id: {type: Type.Integer, format: "int64"},
        name: {type: Type.String}, tag: {type: Type.String}
    }
    
};

let Pets: Schema = {
    type: Type.Array,
    items: RefTo(Pet),
};

let Error: Schema = {
    type: Type.Object,
    required: ["code", "message"],
    properties: {
        code: {type: Type.Integer, format: "int32"},
        message: {type: Type.String},
    }
}

let 