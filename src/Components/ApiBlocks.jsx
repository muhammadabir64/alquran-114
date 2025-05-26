import React from 'react';
import {
    Card,
    CardBody,
    Input,
    Typography
  } from "@material-tailwind/react";
import { DOMAIN } from "../env";


function ApiBlocks({ title, description, url }) {
    return ( 
        <div className="col-12 mb-3">
            <Card>
                <CardBody>
                    <Typography variant="h5" className="text-blue-gray-800">{title}</Typography>
                    <Typography variant="small" className="text-blue-gray-600 mb-3">{description}</Typography>
                    <Input label="URL" value={`${DOMAIN}/api/${url}`} />
                </CardBody>
            </Card>
        </div>
     );
}

export default ApiBlocks;