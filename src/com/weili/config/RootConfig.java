package com.weili.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.session.Configuration;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.weili.service.ServiceHook;

@org.springframework.context.annotation.Configuration
@ComponentScan(basePackageClasses={ServiceHook.class})
@EnableTransactionManagement
public class RootConfig {

	@Bean
	public DataSource buildDataSource() {
		
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName("com.mysql.jdbc.Driver");
		ds.setUrl("jdbc:mysql://localhost:3306/jyks?useUnicode=true&characterEncoding=UTF-8");
		ds.setUsername("root");
		ds.setPassword("123");
		return ds;
	}
	
	@Bean
	public Configuration buildMyBatisConfig() {
		LogFactory.useLog4J2Logging();
		Configuration configuration = new Configuration();
		
		return configuration;
	}
	
	@Bean(name="sqlSessionFactory")
	public SqlSessionFactoryBean buildSessionFactory(
			DataSource datasource, Configuration config) {
		
		SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
		factory.setDataSource(datasource);
		factory.setConfiguration(config);
		
		return factory;
	}
	
	@Bean
	public MapperScannerConfigurer buildMybatisMapperSacnConfig() {
		MapperScannerConfigurer msc = new MapperScannerConfigurer();
		msc.setSqlSessionFactoryBeanName("sqlSessionFactory");
		msc.setBasePackage("com.weili.model.mapper");
		return msc;
	}
	
	@Bean
	public DataSourceTransactionManager transactionManager( 
	        BasicDataSource datasource) {
	    return  new DataSourceTransactionManager(datasource);
	}
}
