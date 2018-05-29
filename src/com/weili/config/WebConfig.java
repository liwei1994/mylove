package com.weili.config;

import java.nio.charset.Charset;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.weili.controller.ControllerScanHook;

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses={ControllerScanHook.class})
public class WebConfig extends WebMvcConfigurerAdapter {

	@Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = 
        		new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setOrder(0);
        return viewResolver;
    }
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// 注册静态文件目录，防止静态文件被Spring MVC拦截
		registry.addResourceHandler("/resources/**")
				.addResourceLocations("/resources/");
	}
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
	StringHttpMessageConverter shm = new StringHttpMessageConverter(Charset.forName("utf-8"));
	converters.add(shm);
	}
	
	 //显示声明CommonsMultipartResolver为mutipartResolver
    @Bean(name = "multipartResolver")
       public MultipartResolver multipartResolver(){
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("UTF-8");
        resolver.setResolveLazily(true);//resolveLazily属性启用是为了推迟文件解析，以在在UploadAction中捕获文件大小异常
        resolver.setMaxInMemorySize(40960);
        resolver.setMaxUploadSize(50*1024*1024);//上传文件大小 50M 50*1024*1024
        return resolver;
    }   
}
