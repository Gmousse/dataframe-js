## Classes

<dl>
<dt><a href="#Matrix">Matrix</a></dt>
<dd><p>Matrix module for DataFrame, providing basic mathematical matrix computations.</p>
</dd>
<dt><a href="#Stat">Stat</a></dt>
<dd><p>Stat module for DataFrame, providing basic statistical metrics for numeric columns.</p>
</dd>
</dl>

<a name="Matrix"></a>

## Matrix
Matrix module for DataFrame, providing basic mathematical matrix computations.

**Kind**: global class  

* [Matrix](#Matrix)
    * [new Matrix(df)](#new_Matrix_new)
    * [.hasSameStruct(df)](#Matrix+hasSameStruct) ⇒ <code>Boolean</code>
    * [.hasSameTransposedStruct(df)](#Matrix+hasSameTransposedStruct) ⇒ <code>Boolean</code>
    * [.add(df)](#Matrix+add) ⇒ <code>DataFrame</code>
    * [.product(number)](#Matrix+product) ⇒ <code>DataFrame</code>
    * [.dot(df)](#Matrix+dot) ⇒ <code>DataFrame</code>

<a name="new_Matrix_new"></a>

### new Matrix(df)
Start the Matrix module.


| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | An instance of DataFrame. |

<a name="Matrix+hasSameStruct"></a>

### matrix.hasSameStruct(df) ⇒ <code>Boolean</code>
Check if two DataFrames are commutative, if both have the same dimensions.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Boolean</code> - True if they are commutative, else false.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to check. |

<a name="Matrix+hasSameTransposedStruct"></a>

### matrix.hasSameTransposedStruct(df) ⇒ <code>Boolean</code>
Check if two DataFrames have the same dimensions while the second is transposed. Required for dot().

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Boolean</code> - True if they can be multiplied, else false.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to check. |

<a name="Matrix+add"></a>

### matrix.add(df) ⇒ <code>DataFrame</code>
Provide an elements pairwise addition of two DataFrames having the same dimensions. See .hasSameStruct().

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new DataFrame resulting to the addition two DataFrames.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to add. |

<a name="Matrix+product"></a>

### matrix.product(number) ⇒ <code>DataFrame</code>
Provide a scalar product between a number and a DataFrame.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new DataFrame resulting to the scalar product.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | The number to multiply. |

<a name="Matrix+dot"></a>

### matrix.dot(df) ⇒ <code>DataFrame</code>
Multiply one DataFrame n x p and a second p x n. See .hasSameTransposedStruct().

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>DataFrame</code> - A new n x n DataFrame resulting to the product of two DataFrame.  

| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | The second DataFrame to multiply. |

<a name="Stat"></a>

## Stat
Stat module for DataFrame, providing basic statistical metrics for numeric columns.

**Kind**: global class  

* [Stat](#Stat)
    * [new Stat(df)](#new_Stat_new)
    * [.max(columnName)](#Stat+max) ⇒ <code>Number</code>
    * [.min(columnName)](#Stat+min) ⇒ <code>Number</code>
    * [.mean(columnName)](#Stat+mean) ⇒ <code>Number</code>
    * [.var(columnName, [population])](#Stat+var) ⇒ <code>Number</code>
    * [.sd(columnName, [population])](#Stat+sd) ⇒ <code>Number</code>
    * [.stats(columnName)](#Stat+stats) ⇒ <code>Object</code>

<a name="new_Stat_new"></a>

### new Stat(df)
Start the Stat module.


| Param | Type | Description |
| --- | --- | --- |
| df | <code>DataFrame</code> | An instance of DataFrame. |

<a name="Stat+max"></a>

### stat.max(columnName) ⇒ <code>Number</code>
Compute the maximal value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The maximal value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evaluate, containing Numbers. |

<a name="Stat+min"></a>

### stat.min(columnName) ⇒ <code>Number</code>
Compute the minimal value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The minimal value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evalue, containing Numbers. |

<a name="Stat+mean"></a>

### stat.mean(columnName) ⇒ <code>Number</code>
Compute the mean value into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The mean value into the column.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evalue, containing Numbers. |

<a name="Stat+var"></a>

### stat.var(columnName, [population]) ⇒ <code>Number</code>
Compute the variance into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The variance into the column.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column to evalue, containing Numbers. |
| [population] | <code>Boolean</code> | <code>false</code> | Population mode. If true, provide the population variance, not the sample one. |

<a name="Stat+sd"></a>

### stat.sd(columnName, [population]) ⇒ <code>Number</code>
Compute the standard deviation into a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Number</code> - The standard deviation into the column.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| columnName | <code>String</code> |  | The column to evalue, containing Numbers. |
| [population] | <code>Boolean</code> | <code>false</code> | Population mode. If true, provide the population standard deviation, not the sample one. |

<a name="Stat+stats"></a>

### stat.stats(columnName) ⇒ <code>Object</code>
Compute all the stats available with the Stat module on a numeric column.

**Kind**: instance method of <code>[Stat](#Stat)</code>  
**Returns**: <code>Object</code> - An dictionnary containing all statistical metrics available.  

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>String</code> | The column to evalue, containing Numbers. |

