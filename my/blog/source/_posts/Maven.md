 

# Maven

## 学习目标

1. 完成Maven下载、安装、配置
2. 了解Maven的功能
3. IDEA中使用Maven
4. Maven项目的创建
<!--more-->
##  一、为什么学习Maven

1. 在Javaweb开发中，需要使用大量的jar包，我们手动去导入；
2. 我们要确定项目的目录结构。例如，`src`目录存放Java源码，`resources`目录存放配置文件，`bin`目录存放编译生成的`.class`文件。
3. 我们还需要配置环境，例如JDK的版本，编译打包的流程，当前代码的版本号。
4. 除了使用Eclipse这样的IDE进行编译外，我们还必须能通过命令行工具进行编译，才能够让项目在一个独立的服务器上编译、测试、部署。

由此，Maven诞生了！

### 1. Maven的功能

Maven就是是专门为Java项目打造的管理和构建工具，它的主要功能有：

- 提供了一套标准化的项目结构；
- 提供了一套标准化的构建流程（编译，测试，打包，发布……）；
- 提供了一套依赖管理机制。

### 2. Maven项目结构

一个使用Maven管理的普通的Java项目，它的目录结构默认如下：

```ascii
a-maven-project
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│       ├── java
│       └── resources
└── target
```

项目的根目录`a-maven-project`是项目名，它有一个项目描述文件`pom.xml`，存放Java源码的目录是`src/main/java`，存放资源文件的目录是`src/main/resources`，存放测试源码的目录是`src/test/java`，存放测试资源的目录是`src/test/resources`，最后，所有编译、打包生成的文件都放在`target`目录里。这些就是一个Maven项目的标准目录结构。

所有的目录结构都是约定好的标准结构，我们千万不要随意修改目录结构。使用标准结构不需要做任何配置，Maven就可以正常使用。

## 二、下载安装Maven

官网;https://maven.apache.org/

![image-20210301202036516](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301202044.jpg)

下载完成后，解压即可；

## 三、配置环境变量

在我们的系统环境变量中

配置如下配置：

- MAVEN_HOME maven的目录

- 在系统的path中配置 %MAVEN_HOME%\bin

![image-20210301203727460](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301203727.jpg)


测试Maven是否安装成功，保证必须配置完毕！

## 四、Maven 基础配置

### 1. 阿里云镜像

maven文件夹下conf/settings.xml

```xml
 <mirror>
      <id>nexus-aliyun</id>
	  <mirrorOf>central</mirrorOf>
	  <name>Nexus aliyun</name>
	  <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
 </mirror>
```



### 2. 本地仓库

maven有本地仓库和远程仓库；

建立一个本地仓库（同样在settings.xml）

```xml
 <localRepository>E:\maven\apache-maven-3.6.1\maven-repo</localRepository>
```

## 五、在IDEA中使用Maven

### 1. 创建一个MavenWeb项目

![image-20210301205505141](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301205505.jpg)



![image-20210301205707291](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301205707.jpg)

![image-20210301205917733](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301205917.jpg)

![image-20210301210048895](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301210048.jpg)

### 2. 等待项目初始化完毕

![image-20210301210203389](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301210203.jpg)

### 3. 项目搭建成功

![image-20210301210317355](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301210317.jpg)

### 4. 查看maven 本地仓库

![image-20210301210644921](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301210644.jpg)

### 5. IDEA中的Maven设置

注意：IDEA项目创建成功后，看一眼Maven的配置，因为项目创建完成后，Maven会使用IDEA默认的Maven。出现该问题要及时改为本地安装的Maven

![image-20210301210922676](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301210922.jpg)

![image-20210301211227132](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301211227.jpg)

到这里，Maven在IDEA中的配置和使用就OK了!

### 6. 问题

![image-20210301211812221](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301211812.jpg)

#### ① 生成 java&resources

创建  java&resources 文件夹

![image-20210301215038147](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301215038.jpg)

#### ② 使用标记文件夹功能

![image-20210301215315063](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301215315.jpg)

![image-20210301215554949](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301215555.jpg)

## 

## 六、创建一个普通的Maven项目 

### 1. 创建Maven项目

![image-20210301211902509](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301211902.jpg)

![image-20210301211943228](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301211943.jpg)

一个单纯的maven 项目

![image-20210301212124482](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301212124.jpg)

这个只有在Web应用下才会有！

![image-20210301212445750](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301212445.jpg)

### 2. 创建Web目录

![image-20210301212718735](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301212718.jpg)

![image-20210301213054629](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301213054.jpg)

## 七、在 IDEA中配置Tomcat

### 1. 下载Tomcat

如果本地没有Tomcat需要下载Tomcat

http://tomcat.apache.org/

### 2. 解压 

apache-tomcat-xx.xx.xx-windows-x64.zip 到非中文无空格目录中 

### 3. 检查是否配置了 JAVA_HOME

![image-20210302160002037](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302160002.jpg)

### 4. 配置环境变量

![image-20210302155237677](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302155238.jpg)

### 5. Path 中添加

![image-20210302155907123](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302155907.jpg)

### 6. IDEA中添加Tomcat (不用配置环境变量也可以)

![image-20210301213528816](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301213528.jpg)

![image-20210302160332145](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210302160332.jpg)

![image-20210301213817792](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301213817.jpg)

![image-20210301213917696](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301213917.jpg)

![image-20210301220234274](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301220234.jpg)

war模式：将WEB工程以包的形式上传到服务器 ；

 war exploded模式：将WEB工程以当前文件夹的位置关系上传到服务器；

（1）war模式这种可以称之为是发布模式，看名字也知道，这是先打成war包，再发布；

（2）war exploded模式是直接把文件夹、jsp页面 、classes等等移到Tomcat 部署文件夹里面，进行加载部署。因此这种方式支持热部署，一般在开发的时候也是用这种方式。

（3）在平时开发的时候，使用热部署的话，应该对Tomcat进行相应的设置，这样的话修改的jsp界面什么的东西才可以及时的显示出来。
![image-20210301220305204](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301220305.jpg)

![image-20210301214310507](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301214310.jpg)

![image-20210301214432717](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301214432.jpg)

![image-20210301214454547](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210301214454.jpg)

## 八、pom文件

pom.xml 是Maven的核心配置

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--Maven版本和头文件-->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <!--这里就是我们刚才配置的GAV-->
  <groupId>com.kuang</groupId>
  <artifactId>javaweb-01-maven</artifactId>
  <version>1.0-SNAPSHOT</version>
  <!--Package：项目的打包方式
  jar：java应用
  war：JavaWeb应用
  -->
  <packaging>war</packaging>

  <!--配置-->
  <properties>
    <!--项目的默认构建编码-->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!--编码版本-->
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <!--项目依赖-->
  <dependencies>
    <!--具体依赖的jar包配置文件-->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
    </dependency>
  </dependencies>

  <!--项目构建用的东西-->
  <build>
    <finalName>javaweb-01-maven</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>

```


maven由于他的约定大于配置，我们之后可以能遇到我们写的配置文件，无法被导出或者生效的问题，解决方案：

```xml
<!--在build中配置resources，来防止我们资源导出失败的问题-->
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

### 依赖关系

Maven定义了几种依赖关系，分别是`compile`、`test`、`runtime`和`provided`：

| scope    | 说明                                          | 示例            |
| :------- | :-------------------------------------------- | :-------------- |
| compile  | 编译时需要用到该jar包（默认）                 | commons-logging |
| test     | 编译Test时需要用到该jar包                     | junit           |
| runtime  | 编译时不需要，但运行时需要用到                | mysql           |
| provided | 编译时需要用到，但运行时由JDK或某个服务器提供 | servlet-api     |

其中，默认的`compile`是最常用的，Maven会把这种类型的依赖直接放入classpath。

`test`依赖表示仅在测试时使用，正常运行时并不需要。最常用的`test`依赖就是JUnit：

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.3.2</version>
    <scope>test</scope>
</dependency>
```

`runtime`依赖表示编译时不需要，但运行时需要。最典型的`runtime`依赖是JDBC驱动，例如MySQL驱动：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.48</version>
    <scope>runtime</scope>
</dependency>
```

`provided`依赖表示编译时需要，但运行时不需要。最典型的`provided`依赖是Servlet API，编译的时候需要，但是运行时，Servlet服务器内置了相关的jar，所以运行期不需要：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.0</version>
    <scope>provided</scope>
</dependency>
```

### 模块管理

在软件开发中，把一个大项目分拆为多个模块是降低软件复杂度的有效方法：

```ascii
                        ┌ ─ ─ ─ ─ ─ ─ ┐
                          ┌─────────┐
                        │ │Module A │ │
                          └─────────┘
┌──────────────┐ split  │ ┌─────────┐ │
│Single Project│───────>  │Module B │
└──────────────┘        │ └─────────┘ │
                          ┌─────────┐
                        │ │Module C │ │
                          └─────────┘
                        └ ─ ─ ─ ─ ─ ─ ┘
```

对于Maven工程来说，原来是一个大项目：

```ascii
single-project
├── pom.xml
└── src
```

现在可以分拆成3个模块：

```ascii
mutiple-project
├── module-a
│   ├── pom.xml
│   └── src
├── module-b
│   ├── pom.xml
│   └── src
└── module-c
    ├── pom.xml
    └── src
```

Maven可以有效地管理多个模块，我们只需要把每个模块当作一个独立的Maven项目，它们有各自独立的`pom.xml`。例如，模块A的`pom.xml`：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>module-a</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <name>module-a</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

模块B的`pom.xml`：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>module-b</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>

    <name>module-b</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

可以看出来，模块A和模块B的`pom.xml`高度相似，因此，我们可以提取出共同部分作为`parent`：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>parent</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>

    <name>parent</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.28</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.5.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

注意到parent的`<packaging>`是`pom`而不是`jar`，因为`parent`本身不含任何Java代码。编写`parent`的`pom.xml`只是为了在各个模块中减少重复的配置。现在我们的整个工程结构如下：

```ascii
multiple-project
├── pom.xml
├── parent
│   └── pom.xml
├── module-a
│   ├── pom.xml
│   └── src
├── module-b
│   ├── pom.xml
│   └── src
└── module-c
    ├── pom.xml
    └── src
```

这样模块A就可以简化为：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.itranswarp.learnjava</groupId>
        <artifactId>parent</artifactId>
        <version>1.0</version>
        <relativePath>../parent/pom.xml</relativePath>
    </parent>

    <artifactId>module-a</artifactId>
    <packaging>jar</packaging>
    <name>module-a</name>
</project>
```

模块B、模块C都可以直接从`parent`继承，大幅简化了`pom.xml`的编写。

如果模块A依赖模块B，则模块A需要模块B的jar包才能正常编译，我们需要在模块A中引入模块B：

```xml
    ...
    <dependencies>
        <dependency>
            <groupId>com.itranswarp.learnjava</groupId>
            <artifactId>module-b</artifactId>
            <version>1.0</version>
        </dependency>
    </dependencies>
```

最后，在编译的时候，需要在根目录创建一个`pom.xml`统一编译：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.itranswarp.learnjava</groupId>
    <artifactId>build</artifactId>
    <version>1.0</version>
    <packaging>pom</packaging>
    <name>build</name>

    <modules>
        <module>parent</module>
        <module>module-a</module>
        <module>module-b</module>
        <module>module-c</module>
    </modules>
</project>
```

这样，在根目录执行`mvn clean package`时，Maven根据根目录的`pom.xml`找到包括`parent`在内的共4个`<module>`，一次性全部编译。