
/**
 * when we run amplify commands in terminal => it works because we configured our amplify cli with aws credentials => 'amplify configure'
 * 
 * When we are running our application locally=> we need to configure our amplify =>This file is used to configure Amplify
 */
import { Amplify } from "aws-amplify";
import config from "@/src/aws-exports";
Amplify.configure(config);
