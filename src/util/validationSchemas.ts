import * as Joi from "joi";

const testSome: Joi.ObjectSchema = Joi.object().keys({
    idx: Joi.number().required()
});

export const validationSchemas = {
    test: {
        test: testSome
    }
};