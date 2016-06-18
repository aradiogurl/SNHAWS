## Functions

<dl>
<dt><a href="#writeContent">writeContent(content, type, {Object)</a></dt>
<dd><p>Writes a string of data to the response as a http found 200</p>
</dd>
<dt><a href="#display404Message">display404Message(msg, response)</a></dt>
<dd><p>Writes a http 404 not found error to the response/client</p>
</dd>
<dt><a href="#processRequestMethod">processRequestMethod(request)</a> ⇒ <code>object</code></dt>
<dd><p>Simple async method to handle POST and GET responses and return both queries in the same format</p>
</dd>
<dt><a href="#loadFileRequest">loadFileRequest(url, query, response)</a></dt>
<dd><p>Method to handle the files and endpoints</p>
</dd>
<dt><a href="#processRequest">processRequest(request, response)</a></dt>
<dd><p>Callback which processes requests passed from the server</p>
</dd>
</dl>

<a name="writeContent"></a>

## writeContent(content, type, {Object)
Writes a string of data to the response as a http found 200

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The data to write to the response/client |
| type | <code>String</code> | The type of data that is being written |
| {Object |  | response The response object |

<a name="display404Message"></a>

## display404Message(msg, response)
Writes a http 404 not found error to the response/client

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>String</code> | The message to write to the response/client |
| response | <code>Object</code> | The response object |

<a name="processRequestMethod"></a>

## processRequestMethod(request) ⇒ <code>object</code>
Simple async method to handle POST and GET responses and return both queries in the same format

**Kind**: global function  
**Returns**: <code>object</code> - query The query object  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>object</code> | The server request |

<a name="loadFileRequest"></a>

## loadFileRequest(url, query, response)
Method to handle the files and endpoints

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The full uri/url aka path+file |
| query | <code>Object</code> | The query from the request |
| response | <code>Oject</code> | The response |

<a name="processRequest"></a>

## processRequest(request, response)
Callback which processes requests passed from the server

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Object</code> | The server request |
| response | <code>Object</code> | The response |

