## Functions

<dl>
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

